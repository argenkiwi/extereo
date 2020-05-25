import * as React from 'react';
import { add } from '../service';
import Track from '../model/Track';
import FoundItem from './FoundItem';
import './PlaylistItem.css';

interface Props {
    track: Track;
}

const PlaylistItem = ({ track }: Props) => {
    const [tracks, setTracks] = React.useState([])

    function load(uri: string) {
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

            setTracks(tracks)
        };
        xhr.onerror = () => console.log(xhr.response);
        xhr.send();
    }

    return (
        <ol className="PlaylistItem">
            <li key={track.href}>
                <span>{track.title}</span>
                {tracks.length > 0 ?
                    <button onClick={() => add(...tracks)}>Add All</button> :
                    <button onClick={() => load(track.href)}>Load</button>
                }
            </li>
            {tracks.length > 0 && tracks.map(track =>
                <FoundItem key={track.href} track={track} />
            )}
        </ol>
    )
}

export default PlaylistItem;
