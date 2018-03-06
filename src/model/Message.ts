import Track from "./Track";

type Message =
    {
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
    } | Message.Seek | {
        kind: Message.Kind.Sort,
        from: number,
        to: number
    } | {
        kind: Message.Kind.Ping
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
}

export default Message;
