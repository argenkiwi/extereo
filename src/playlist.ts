import { Observable, Subject } from 'rxjs';
import { arrayMove } from 'react-sortable-hoc';
import Message from './model/Message';
import Track from './model/Track';
import PlayerState from './model/PlayerState';
import PlaylistState from './model/PlaylistState';
import { player as reportPlayerState, playlist as reportPlaylistState } from './service';
import StateEventModel from './core/StateEventModel';

const player: Subject<PlayerState> = new Subject()
const player$ = player.startWith<PlayerState>({
    duration: 0,
    elapsed: 0,
    paused: true
}).scan((acc, value) => ({ ...acc, ...value }))

const message$ = Observable.fromEventPattern((h: (message: Message) => void) => {
    chrome.runtime.onMessage.addListener(h);
}, (h: (message: Message) => void) => {
    chrome.runtime.onMessage.removeListener(h);
}, (message: Message) => message)

const command$ = Observable.fromEventPattern((h: (command: string) => void) => {
    chrome.commands.onCommand.addListener(h);
}, (h: (command: string) => void) => {
    chrome.commands.onCommand.removeListener(h);
}, (command: string) => command)

const audio = document.createElement('audio')

Observable.fromEvent(audio, 'play')
    .merge(Observable.fromEvent(audio, 'pause'))
    .withLatestFrom(player$, (event, state): PlayerState => ({
        paused: audio.paused
    }))
    .subscribe(player)

Observable.fromEvent(audio, 'durationchange')
    .withLatestFrom(player$, (event, state): PlayerState => ({
        duration: audio.duration
    }))
    .subscribe(player)

Observable.fromEvent(audio, 'timeupdate').debounce(() => Observable.timer(100))
    .withLatestFrom(player$, (event, state): PlayerState => ({
        elapsed: audio.currentTime
    }))
    .subscribe(player)

player$.subscribe(reportPlayerState);

message$
    .filter((message: Message) => message.kind === Message.Kind.Play)
    .subscribe(() => audio.play())

message$
    .filter((message: Message) => message.kind === Message.Kind.Pause)
    .subscribe(() => audio.pause())

command$
    .filter(command => command === 'play-pause')
    .subscribe(() => audio.paused ? audio.play() : audio.pause())

message$
    .filter((message: Message) => message.kind == Message.Kind.Seek)
    .subscribe((message: Message.Seek) => audio.currentTime = message.kind);

const ping$ = message$.filter((message: Message) => message.kind == Message.Kind.Ping)
ping$.withLatestFrom(player$, (message, state) => state).subscribe(player);

const playlistModel = new StateEventModel<PlaylistState, Message>((state, message) => {
    switch (message.kind) {
        case Message.Kind.Add:
            return { ...state, tracks: state.tracks.concat(message.tracks) }
        case Message.Kind.Clear:
            return { ...state, tracks: [], position: 0 }
        case Message.Kind.Jump:
            return { ...state, position: message.position }
        case Message.Kind.Previous:
            return state.position > 0 ? { ...state, position: state.position - 1 } : state
        case Message.Kind.Next:
            return state.position < state.tracks.length ? {
                ...state,
                position: state.position + 1
            } : state
        case Message.Kind.Remove:
            return {
                ...state,
                position: message.position < state.position ? state.position - 1 : state.position,
                tracks: state.tracks
                    .slice(0, message.position)
                    .concat(state.tracks.slice(message.position + 1))
            }
        case Message.Kind.Sort:
            const { position, tracks } = state
            const { from, to } = message
            return {
                ...state,
                position: position < from && position >= to ? position + 1 : (
                    position > from && position <= to ? position - 1 : (
                        position === from ? to : position
                    )
                ),
                tracks: arrayMove(Array.from(tracks), from, to)
            }
        default:
            return state;
    }
}, { tracks: [], position: 0 })

message$.subscribe((message: Message) => playlistModel.publish(message))

command$.filter(command => command === 'prev-track')
    .subscribe(_ => playlistModel.publish({ kind: Message.Kind.Previous }))

command$.filter(command => command === 'next-track')
    .merge(Observable.fromEvent(audio, 'ended'))
    .merge(Observable.fromEvent(audio, 'error'))
    .subscribe(_ => playlistModel.publish({ kind: Message.Kind.Next }))

playlistModel.stateObservable
    .map((state: PlaylistState) => state.position < state.tracks.length ? state.tracks[state.position] : null)
    .subscribe(track => {
        if (track) {
            if (track.href === audio.src) return;
            audio.src = track.href;
            audio.title = track.title;
            audio.load();
            audio.play();
        } else {
            audio.pause();
            audio.src = '';
        }
    })

playlistModel.stateObservable.subscribe(reportPlaylistState)
