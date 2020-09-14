import Track from "./Track";
import PlayerState from "./PlayerState";
import PlaylistState from "./PlaylistState";

type Message = { kind: Message.Kind.Player, playerState: PlayerState }
    | { kind: Message.Kind.Playlist, playlistState: PlaylistState }
    | { kind: Message.Kind.Found, tracks: Track[] }
    | { kind: Message.Kind.Scan }

namespace Message {
    export const enum Kind {
        Found,
        Player,
        Playlist,
        Scan,
    }
}

export default Message;
