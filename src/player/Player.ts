import { Observable } from 'rxjs';
import PlayerEvent from "../model/PlayerEvent";
import Track from '../model/Track';

interface Player {
    event$: Observable<PlayerEvent>
    load(track: Track): void
    play(): void
    pause(): void
    seek(time: number): void
    toggle(): void
}

export default Player
