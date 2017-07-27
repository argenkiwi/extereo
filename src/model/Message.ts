interface Message<T> {
    type: Message.Type;
    content?: T;
}

module Message {
    export const enum Type {
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
}

export default Message;
