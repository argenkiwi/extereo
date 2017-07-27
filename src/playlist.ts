import { Observable, Subject } from 'rxjs';
import { arrayMove } from 'react-sortable-hoc';
import Message from './model/Message';
import Track from './model/Track';
import PlayerState from './model/PlayerState';
import PlaylistState from './model/PlaylistState';
import { player as reportPlayerState, playlist as reportPlaylistState } from './service';

const player: Subject<PlayerState> = new Subject()
const player$ = player.startWith<PlayerState>({
    duration: 0,
    elapsed: 0,
    paused: true
}).scan((acc, value) => ({ ...acc, ...value }))

const playlist: Subject<PlaylistState> = new Subject()
const playlist$ = playlist.startWith({
    tracks: [],
    position: 0
}).scan((acc, value) => ({ ...acc, ...value }))

const message$ = Observable.fromEventPattern((h: (message: Message<any>) => void) => {
    chrome.runtime.onMessage.addListener(h);
}, (h: (message: Message<any>) => void) => {
    chrome.runtime.onMessage.removeListener(h);
}, (message: Message<any>) => message)

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

playlist$
    .map(state => state.position < state.tracks.length ? state.tracks[state.position] : null)
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

player$.subscribe(reportPlayerState);
playlist$.subscribe(reportPlaylistState);

message$
    .filter(message => message.type == Message.Type.Add)
    .map((message: Message<Track[]>) => message.content)
    .withLatestFrom(playlist$, (tracks, state): PlaylistState => ({
        tracks: state.tracks.concat(tracks)
    }))
    .subscribe(playlist)

message$
    .filter(message => message.type == Message.Type.Clear)
    .map((): PlaylistState => ({ tracks: [], position: 0 }))
    .subscribe(playlist)

message$
    .filter(message => message.type == Message.Type.Jump)
    .map((message: Message<number>) => message.content)
    .withLatestFrom(playlist$, (position, state): PlaylistState => ({
        position: position
    }))
    .subscribe(playlist)

message$
    .filter(message => message.type == Message.Type.Previous)
    .merge(command$.filter(command => command === 'prev-track'))
    .withLatestFrom(playlist$, (event, state): PlaylistState => state.position > 0 ? {
        position: state.position - 1
    } : state)
    .subscribe(playlist)

message$
    .filter(message => message.type == Message.Type.Play)
    .subscribe(() => audio.play())

message$
    .filter(message => message.type == Message.Type.Pause)
    .subscribe(() => audio.pause())

command$
    .filter(command => command === 'play-pause')
    .subscribe(() => audio.paused ? audio.play() : audio.pause())

message$
    .filter(message => message.type == Message.Type.Next)
    .merge(command$.filter(command => command === 'next-track'))
    .merge(Observable.fromEvent(audio, 'ended'))
    .merge(Observable.fromEvent(audio, 'error'))
    .withLatestFrom(playlist$, (event, state): PlaylistState => {
        return state.position < state.tracks.length ? {
            position: state.position + 1
        } : state
    })
    .subscribe(playlist)

message$
    .filter(message => message.type == Message.Type.Remove)
    .map((message: Message<number>) => message.content)
    .withLatestFrom(playlist$, (position, state): PlaylistState => ({
        position: position < state.position ? state.position - 1 : state.position,
        tracks: state.tracks.slice(0, position).concat(state.tracks.slice(position + 1))
    }))
    .subscribe(playlist);

message$
    .filter(message => message.type == Message.Type.Seek)
    .map((message: Message<number>) => message.content)
    .subscribe(time => audio.currentTime = time);

const sort = ({ from, to }: {
    from: number,
    to: number
}, { position, tracks }: PlaylistState) => ({
    position: position < from && position >= to ? position + 1 : (
        position > from && position <= to ? position - 1 : (
            position === from ? to : position
        )
    ),
    tracks: arrayMove(Array.from(tracks), from, to)
});

message$
    .filter(message => message.type == Message.Type.Sort)
    .map((message: Message<{ from: number, to: number }>) => message.content)
    .withLatestFrom(playlist$, sort)
    .subscribe(playlist)

const ping$ = message$.filter(message => message.type == Message.Type.Ping)
ping$.withLatestFrom(player$, (message, state) => state).subscribe(player);
ping$.withLatestFrom(playlist$, (message, state) => state).subscribe(playlist)