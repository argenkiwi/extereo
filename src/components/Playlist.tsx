import * as React from 'react';
import Message from '../model/Message';
import PlayerState from '../model/PlayerState';
import PlaylistState from '../model/PlaylistState';
import { ping, seek, sort } from '../service';
import Header from './Header';
import SeekBar from './SeekBar';
import TrackList from './TrackList';
import Footer from './Footer';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Props extends React.HTMLProps<HTMLDivElement> {
    message$: Observable<Message>
}

const Playlist = ({ message$ }: Props) => {
    const [playerState, setPlayerState] = React.useState({
        duration: 0,
        elapsed: 0,
        paused: true
    } as PlayerState)

    React.useEffect(() => {
        const subscription = message$
            .pipe(filter((message: Message) => message.kind == Message.Kind.Player))
            .pipe(map((message: Message.Player) => message.playerState))
            .subscribe(setPlayerState)

        return () => { subscription.unsubscribe() }
    }, [message$, setPlayerState])

    const [playlistState, setPlaylistState] = React.useState({
        position: 0,
        tracks: []
    } as PlaylistState)

    React.useEffect(() => {
        const subscription = message$
            .pipe(filter((message: Message) => message.kind == Message.Kind.Playlist))
            .pipe(map((message: Message.Playlist) => message.playlistState))
            .subscribe(setPlaylistState)

        return () => { subscription.unsubscribe() }
    }, [message$, setPlaylistState])

    React.useEffect(() => { ping() }, [])

    return (
        <div className="h-full flex flex-col overflow-y-auto">
            <Header
                paused={playerState.paused}
                current={playlistState.position}
                total={playlistState.tracks.length} />
            <SeekBar
                elapsed={playerState.elapsed}
                duration={playerState.duration}
                onSeek={seek} />
            <TrackList
                position={playlistState.position}
                tracks={playlistState.tracks}
                onSortEnd={({ oldIndex, newIndex }) => sort(oldIndex, newIndex)}
                useDragHandle={true} />
            <Footer tracks={playlistState.tracks} />
        </div>
    )
}

export default Playlist;
