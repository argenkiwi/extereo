import { arrayMove } from "react-sortable-hoc"
import StateEventModel from "../core/StateEventModel"
import PlaylistEvent from "./PlaylistEvent"
import PlaylistState from "./PlaylistState"

export const playlistModel = new StateEventModel<PlaylistState, PlaylistEvent>((state, event) => {
    switch (event.kind) {
        case PlaylistEvent.Kind.Add:
            return { ...state, tracks: state.tracks.concat(event.tracks) }
        case PlaylistEvent.Kind.Clear:
            return { ...state, tracks: [], position: 0 }
        case PlaylistEvent.Kind.Jump:
            return { ...state, position: event.position }
        case PlaylistEvent.Kind.Previous:
            return state.position > 0 ? { ...state, position: state.position - 1 } : state
        case PlaylistEvent.Kind.Next:
            return state.position < state.tracks.length ? {
                ...state,
                position: state.position + 1
            } : state
        case PlaylistEvent.Kind.Remove:
            return {
                ...state,
                position: event.position < state.position ? state.position - 1 : state.position,
                tracks: state.tracks
                    .slice(0, event.position)
                    .concat(state.tracks.slice(event.position + 1))
            }
        case PlaylistEvent.Kind.Sort:
            const { position, tracks } = state
            const { from, to } = event
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
})
