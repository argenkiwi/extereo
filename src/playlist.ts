import { arrayMove } from 'react-sortable-hoc'
import { merge, fromEventPattern } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import Message from './model/Message'
import PlayerEvent from './model/PlayerEvent'
import PlayerState from './model/PlayerState'
import PlaylistState from './model/PlaylistState'
import { player as reportPlayerState, playlist as reportPlaylistState } from './service'
import StateEventModel from './core/StateEventModel'
import AudioPlayer from './player/AudioPlayer';
import Player from './player/Player';
import Track from './model/Track';

const message$ = fromEventPattern((h: (message: Message) => void) => {
    chrome.runtime.onMessage.addListener(h);
}, (h: (message: Message) => void) => {
    chrome.runtime.onMessage.removeListener(h);
}, (message: Message) => message)

const command$ = fromEventPattern((h: (command: string) => void) => {
    chrome.commands.onCommand.addListener(h);
}, (h: (command: string) => void) => {
    chrome.commands.onCommand.removeListener(h);
}, (command: string) => command)

const playerModel = new StateEventModel<PlayerState, PlayerEvent>(
    (state, event) => {
        switch (event.kind) {
            case PlayerEvent.Kind.Play:
                return {
                    ...state,
                    paused: false
                }
            case PlayerEvent.Kind.Pause:
                return {
                    ...state,
                    paused: true
                }
            case PlayerEvent.Kind.DurationChange:
                return {
                    ...state,
                    duration: event.duration
                }
            case PlayerEvent.Kind.TimeUpdate:
                return {
                    ...state,
                    elapsed: event.time
                }
            default:
                return state;
        }
    }, {
        duration: 0,
        elapsed: 0,
        paused: true
    }
)

playerModel.stateObservable.subscribe(reportPlayerState)

const player: Player = new AudioPlayer()

player.event$.subscribe(event => playerModel.publish(event))

message$.subscribe(message => {
    switch (message.kind) {
        case Message.Kind.Play:
            player.play()
            break
        case Message.Kind.Pause:
            player.pause()
            break
        case Message.Kind.Seek:
            player.seek(message.time)
            break
    }
})

command$.pipe(
    filter((command: String) => command === 'play-pause')
).subscribe(_ => player.toggle())

message$.pipe(
    filter((message: Message) => message.kind == Message.Kind.Ping)
).subscribe(() => playerModel.publish({ kind: null }))

const playlistModel = new StateEventModel<PlaylistState, Message>(
    (state, message) => {
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
    }, {
        tracks: [],
        position: 0
    }
)

message$.subscribe((message: Message) => playlistModel.publish(message))

command$.pipe(
    filter((command: String) => command === 'prev-track')
).subscribe(_ => playlistModel.publish({ kind: Message.Kind.Previous }))

merge(
    filter((command: String) => command === 'next-track'),
    player.event$.pipe(filter((event: PlayerEvent) => event.kind == PlayerEvent.Kind.Ended)),
    player.event$.pipe(filter((event: PlayerEvent) => event.kind == PlayerEvent.Kind.Error))
).subscribe(_ => playlistModel.publish({ kind: Message.Kind.Next }))

playlistModel.stateObservable.pipe(
    map((state: PlaylistState) => state.position < state.tracks.length
        ? state.tracks[state.position]
        : null)
).subscribe((track: Track) => player.load(track))

playlistModel.stateObservable.subscribe(reportPlaylistState)
