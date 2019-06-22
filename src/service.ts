import Message from './model/Message'
import Track from './model/Track'
import PlayerState from './model/PlayerState'
import PlaylistState from './model/PlaylistState'

export function add(...tracks: Track[]) {
    send({
        kind: Message.Kind.Add,
        tracks: tracks
    })
}

export function clear() {
    send({
        kind: Message.Kind.Clear
    })
}

export function found(tracks: Track[]) {
    send({
        kind: Message.Kind.Found,
        tracks: tracks
    })
}

export function jump(position: number) {
    send({
        kind: Message.Kind.Jump,
        position: position
    })
}

export function next() {
    send({
        kind: Message.Kind.Next
    })
}

export function pause() {
    send({
        kind: Message.Kind.Pause
    })
}

export function ping() {
    send({
        kind: Message.Kind.Ping
    })
}

export function play() {
    send({
        kind: Message.Kind.Play
    })
}

export function previous() {
    send({
        kind: Message.Kind.Previous
    })
}

export function remove(position: number) {
    send({
        kind: Message.Kind.Remove,
        position: position
    })
}

export function scan(callback: (response: Track[]) => void) {
    if (!chrome.tabs) return
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
        kind: Message.Kind.Scan
    }, callback)))
}

export function seek(time: number) {
    send({
        kind: Message.Kind.Seek,
        time: time
    })
}

export function player(playerState: PlayerState) {
    send({
        kind: Message.Kind.Player,
        playerState: playerState
    })
}

export function playlist(playlistState: PlaylistState) {
    send({
        kind: Message.Kind.Playlist,
        playlistState: playlistState
    })
}

export function sort(from: number, to: number) {
    send({
        kind: Message.Kind.Sort,
        from: from,
        to: to
    })
}

function send(message: Message) {
    chrome.runtime.sendMessage(message)
}
