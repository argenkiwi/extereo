import Track from "./Track";

type PlaylistEvent = {
  kind: PlaylistEvent.Kind.Add
  tracks: Track[]
} | {
  kind: PlaylistEvent.Kind.Clear
} | {
  kind: PlaylistEvent.Kind.Jump,
  position: number
} | {
  kind: PlaylistEvent.Kind.Previous
} | {
  kind: PlaylistEvent.Kind.Next
} | {
  kind: PlaylistEvent.Kind.Remove,
  position: number
} | {
  kind: PlaylistEvent.Kind.Sort,
  from: number,
  to: number
}

namespace PlaylistEvent {
  export const enum Kind {
    Add,
    Clear,
    Jump,
    Previous,
    Next,
    Remove,
    Sort
  }
}

export default PlaylistEvent