import * as React from 'react';
import { Observable, Subscription } from 'rxjs';
import { SortEndHandler } from 'react-sortable-hoc';
import Message from '../model/Message';
import Track from '../model/Track';
import PlayerState from '../model/PlayerState';
import PlaylistState from '../model/PlaylistState';
import { ping, seek, sort } from '../service';
import BaseComponent from './BaseComponent';
import Header from './Header';
import SeekBar from './SeekBar';
import TrackList from './TrackList';
import Footer from './Footer';
import './Playlist.css';

interface Props extends BaseComponent.Props, React.HTMLProps<HTMLDivElement> { }

interface State {
    playerState: PlayerState;
    playlistState: PlaylistState;
}

class Playlist extends BaseComponent<Props, State> {

    constructor(props: Props) {
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

        this.subscriptions.push(message$
            .filter(message => message.type == Message.Type.Player)
            .map((message: Message<PlayerState>) => message.content)
            .subscribe(playerState => this.setState({ playerState })));

        this.subscriptions.push(message$
            .filter(message => message.type == Message.Type.Playlist)
            .map((message: Message<PlaylistState>) => message.content)
            .subscribe(playlistState => this.setState({ playlistState })));

        ping();
    }

    onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        sort(oldIndex, newIndex);
    }

    render() {
        const { message$ } = this.props;
        const { playerState, playlistState } = this.state;
        return (
            <div className="Playlist">
                <Header paused={playerState.paused} />
                <SeekBar
                    elapsed={playerState.elapsed}
                    duration={playerState.duration}
                    onSeek={seek}
                />
                <TrackList
                    position={playlistState.position}
                    tracks={playlistState.tracks}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                />
                <Footer tracks={playlistState.tracks} />
            </div>
        );
    }
}

export default Playlist;