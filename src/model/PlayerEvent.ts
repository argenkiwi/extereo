type PlayerEvent =
    {
        kind: PlayerEvent.Kind.Play
    } | {
        kind: PlayerEvent.Kind.Pause
    } | {
        kind: PlayerEvent.Kind.DurationChange,
        duration: number
    } | {
        kind: PlayerEvent.Kind.TimeUpdate,
        time: number
    }

namespace PlayerEvent {
    export const enum Kind {
        Play,
        Pause,
        DurationChange,
        TimeUpdate
    }
}

export default PlayerEvent
