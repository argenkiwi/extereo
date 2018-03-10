import { Observable } from 'rxjs'
import Track from '../model/Track';
import PlayerEvent from '../model/PlayerEvent';
import Player from './Player';

class AudioPlayer implements Player {
    private audio = document.createElement('audio')

    event$: Observable<PlayerEvent> = Observable.merge(
        Observable.fromEvent(this.audio, 'play').map(_ => ({
            kind: PlayerEvent.Kind.Play
        } as PlayerEvent)),
        Observable.fromEvent(this.audio, 'pause').map(_ => ({
            kind: PlayerEvent.Kind.Pause
        } as PlayerEvent)),
        Observable.fromEvent(this.audio, 'durationchange').map(_ => ({
            kind: PlayerEvent.Kind.DurationChange,
            duration: this.audio.duration
        }) as PlayerEvent),
        Observable.fromEvent(this.audio, 'timeupdate').debounce(() => Observable.timer(100)).map(_ => ({
            kind: PlayerEvent.Kind.TimeUpdate,
            time: this.audio.currentTime
        }) as PlayerEvent),
        Observable.fromEvent(this.audio, 'ended').map(_ => ({
            kind: PlayerEvent.Kind.Ended
        } as PlayerEvent)),
        Observable.fromEvent(this.audio, 'error').map(_ => ({
            kind: PlayerEvent.Kind.Error
        } as PlayerEvent))
    )

    load(track?: Track) {
        if (track) {
            if (track.href === this.audio.src) return;
            this.audio.src = track.href;
            this.audio.title = track.title;
            this.audio.load();
            this.audio.play();
        } else {
            this.audio.pause();
            this.audio.src = '';
        }
    }

    play() {
        this.audio.play()
    }

    pause() {
        this.audio.pause()
    }

    seek(time: number) {
        this.audio.currentTime = time
    }

    toggle() {
        this.audio.paused ? this.audio.play() : this.audio.pause()
    }
}

export default AudioPlayer
