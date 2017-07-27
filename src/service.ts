import Message from './model/Message';
import Track from './model/Track';
import PlayerState from './model/PlayerState';
import PlaylistState from './model/PlaylistState';

export function add(...tracks: Track[]) {
    send({
        type: Message.Type.Add,
        content: tracks
    });
}

export function clear() {
    send({
        type: Message.Type.Clear
    });
}

export function found(tracks: Track[]) {
    send({
        type: Message.Type.Found,
        content: tracks
    });
}

export function jump(position: number) {
    send({
        type: Message.Type.Jump,
        content: position
    });
}

export function next() {
    send({
        type: Message.Type.Next
    });
}

export function pause() {
    send({
        type: Message.Type.Pause
    });
}

export function ping() {
    send({
        type: Message.Type.Ping
    });
}

export function play() {
    send({
        type: Message.Type.Play
    });
}

export function previous() {
    send({
        type: Message.Type.Previous
    });
}

export function remove(position: number) {
    send({
        type: Message.Type.Remove,
        content: position
    });
}

export function scan(callback: (response: Track[]) => void) {
    if (!chrome.tabs) return;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
        type: Message.Type.Scan
    }, callback)));
}

export function seek(time: number) {
    send({
        type: Message.Type.Seek,
        content: time
    });
}

export function player(playerState: PlayerState) {
    send({
        type: Message.Type.Player,
        content: playerState
    });
}

export function playlist(playlistState: PlaylistState) {
    send({
        type: Message.Type.Playlist,
        content: playlistState
    });
}

export function sort(from: number, to: number) {
    send({
        type: Message.Type.Sort,
        content: { from, to }
    });
}

function send(message: Message<any>) {
    chrome.runtime.sendMessage(message);
}