import Track from "./Track";
import PlayerState from "./PlayerState";
import PlaylistState from "./PlaylistState";

type Message = Message.Seek
    | Message.Player
    | Message.Playlist
    | {
        kind: Message.Kind.Add
        tracks: Track[]
    } | {
        kind: Message.Kind.Clear
    } | {
        kind: Message.Kind.Jump,
        position: number
    } | {
        kind: Message.Kind.Previous
    } | {
        kind: Message.Kind.Next
    } | {
        kind: Message.Kind.Remove,
        position: number
    } | {
        kind: Message.Kind.Sort,
        from: number,
        to: number
    } | {
        kind: Message.Kind.Ping
    } | {
        kind: Message.Kind.Play
    } | {
        kind: Message.Kind.Pause
    } | {
        kind: Message.Kind.Found,
        tracks: Track[]
    } | {
        kind: Message.Kind.Scan
    }

namespace Message {
    export const enum Kind {
        Add,
        Clear,
        Found,
        Jump,
        Next,
        Pause,
        Ping,
        Play,
        Player,
        Playlist,
        Previous,
        Remove,
        Scan,
        Seek,
        Sort
    }

    export interface Seek {
        kind: Kind.Seek,
        time: number
    }

    export interface Player {
        kind: Kind.Player,
        playerState: PlayerState
    }

    export interface Playlist {
        kind: Kind.Playlist,
        playlistState: PlaylistState
    }
}

export default Message;
