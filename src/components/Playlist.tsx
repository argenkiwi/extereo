import * as React from 'react';
import { Observable, Subscription } from 'rxjs';
import Message from '../model/Message';
import Track from '../model/Track';
import PlayerState from '../model/PlayerState';
import PlaylistState from '../model/PlaylistState';
import { clear, ping, seek } from '../service';
import BaseComponent from './BaseComponent';
import Controls from './Controls';
import SeekBar from './SeekBar';
import TrackList from './TrackList';
import './Playlist.css';

interface Props extends BaseComponent.Props, React.HTMLProps<HTMLDivElement> {}

interface State {
    playerState: PlayerState;
    playlistState: PlaylistState;
}

class Playlist extends BaseComponent<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            playerState: {
                duration: 0,
                elapsed: 0,
                paused: true
            },
            playlistState: {
                position: 0,
                tracks: []
            }
        };
    }

    componentDidMount() {
        const { message$ } = this.props;

        const playerState$ = message$
            .filter(message => message.type == Message.Type.Player)
            .map((message: Message<PlayerState>) => message.content);

        const playListState$ = message$
            .filter(message => message.type == Message.Type.Playlist)
            .map((message: Message<PlaylistState>) => message.content);

        this.subscriptions.push(playerState$
            .combineLatest(playListState$, (playerState, playlistState) => ({
                playerState: playerState,
                playlistState: playlistState
            }))
            .subscribe(state => this.setState(state)));

        ping();
    }

    render() {
        const { message$ } = this.props;
        const { playerState, playlistState } = this.state;
        return (
            <div className="Playlist">
                <strong>PLAYLIST</strong>
                <Controls paused={playerState.paused} />
                <SeekBar
                    elapsed={playerState.elapsed}
                    duration={playerState.duration}
                    onSeek={seek}
                />
                <TrackList
                    position={playlistState.position}
                    tracks={playlistState.tracks}
                />
                <div>
                    <button
                        disabled={!playlistState.tracks.length}
                        onClick={() => allowExportToM3U(playlistState.tracks)}
                    >Export</button>
                    <button
                        disabled={!playlistState.tracks.length}
                        onClick={() => clear()}
                    >Clear</button>
                </div>
            </div>
        );
    }
}

function allowExportToM3U(tracks: Track[]) {
    chrome.permissions.request({
        permissions: ['downloads']
    }, function (granted) {
        if (granted) exportToM3U(tracks);
    });
}

function exportToM3U(tracks: Track[]) {
    const urls = tracks.map(track => track.href).join('\n');
    const blob = new Blob([urls], {
        type: 'application/x-mpegurl'
    });
    chrome.downloads.download({
        url: window.URL.createObjectURL(blob),
        filename: 'playlist.m3u'
    });
}

export default Playlist;