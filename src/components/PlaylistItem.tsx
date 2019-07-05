import * as React from 'react';
import { add } from '../service';
import Track from '../model/Track';
import FoundItem from './FoundItem';
import './PlaylistItem.css';

interface Props {
    track: Track;
}

interface State {
    tracks: Track[]
}

class PlaylistItem extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            tracks: []
        };
    }

    load = (uri: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", uri);
        xhr.overrideMimeType("audio/x-mpegurl");
        xhr.onload = () => {
            const { response }: { response: string } = xhr;
            const tracks = response.split('\n')
                .map(line => line.trim())
                .filter(line => line.length && !line.startsWith('#'))
                .map(line => ({
                    href: line,
                    title: decodeURIComponent(line.substring(line.lastIndexOf('/') + 1))
                }));

            this.setState({ tracks });
        };
        xhr.onerror = () => console.log(xhr.response);
        xhr.send();
    }

    render() {
        const { track } = this.props;
        const { tracks } = this.state;
        return (
            <ol className="PlaylistItem">
                <li key={track.href}>
                    <span>{track.title}</span>
                    {tracks.length > 0 ?
                        <button onClick={() => add(...tracks)}>Add All</button> :
                        <button onClick={() => this.load(track.href)}>Load</button>
                    }
                </li>
                {tracks.length > 0 && tracks.map(track =>
                    <FoundItem key={track.href} track={track} />
                )}
            </ol>
        );
    }
}

export default PlaylistItem;
