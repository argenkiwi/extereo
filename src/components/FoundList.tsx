import * as React from 'react';
import { add } from '../service';
import Track from '../model/Track';
import FoundItem from './FoundItem';
import './FoundList.css';

function FoundList({ tracks }: { tracks: Track[] }) {
    return (
        <ol className="FoundList">
            <li>
                <span>Tracks found: {tracks.length}</span>
                <button
                    disabled={!tracks.length}
                    onClick={() => add(...tracks)}
                >Add All</button>
            </li>
            {tracks.map(track =>
                <FoundItem key={track.href} track={track} />
            )}
        </ol>
    );
}

export default FoundList;