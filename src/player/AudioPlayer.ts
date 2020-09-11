import { fromEvent, Observable, merge, timer, Subject } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import PlayerEvent from '../model/PlayerEvent';
import Track from '../model/Track';
import Player from './Player';

class AudioPlayer implements Player {
    private audio = document.createElement('audio')

    event$ = merge(
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
        fromEvent(this.audio, 'ended')
            .pipe(map(_ => ({
                kind: PlayerEvent.Kind.Ended
            }) as PlayerEvent))
    )

    constructor() {
        const timeupdate$ = fromEvent(this.audio, 'timeupdate')
            .pipe(
                debounce(() => timer(100)),
                map(_ => this.audio.currentTime)
            )

        chrome.runtime.onConnect.addListener(function (port) {
            console.assert(port.name == "timeupdate");
            const subscription = timeupdate$.subscribe(time => port.postMessage(time))
            port.onDisconnect.addListener(_ => subscription.unsubscribe())
        });
    }

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
