import StateEventModel from "../core/StateEventModel"
import PlayerEvent from "./PlayerEvent"
import PlayerState from "./PlayerState"

export const playerModel = new StateEventModel<PlayerState, PlayerEvent>((state, event) => {
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
})
