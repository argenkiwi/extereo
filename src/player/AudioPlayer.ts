import { fromEvent, Observable, merge, timer } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import PlayerEvent from '../model/PlayerEvent';
import Track from '../model/Track';
import Player from './Player';

class AudioPlayer implements Player {
    private audio = document.createElement('audio')

    event$: Observable<PlayerEvent> = merge(
        fromEvent(this.audio, 'play')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.Play
            }) as PlayerEvent)),
        fromEvent(this.audio, 'pause')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.Pause
            }) as PlayerEvent)),
        fromEvent(this.audio, 'durationchange')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.DurationChange,
                duration: this.audio.duration
            }) as PlayerEvent)),
        fromEvent(this.audio, 'timeupdate')
            .pipe(debounce(() => timer(100)))
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.TimeUpdate,
                time: this.audio.currentTime
            }) as PlayerEvent)),
        fromEvent(this.audio, 'ended')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.Ended
            }) as PlayerEvent)),
        fromEvent(this.audio, 'error')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.Error
            }) as PlayerEvent))
    );

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
