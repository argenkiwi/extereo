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
    } | {
        kind: PlayerEvent.Kind.Ended
    } | {
        kind: PlayerEvent.Kind.Error
    }

namespace PlayerEvent {
    export const enum Kind {
        Play,
        Pause,
        DurationChange,
        TimeUpdate,
        Ended,
        Error
    }
}

export default PlayerEvent
