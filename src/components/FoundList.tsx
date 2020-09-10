import * as React from 'react';
import { add } from '../service';
import Track from '../model/Track';
import FoundItem from './FoundItem';

const FoundList = ({ tracks }: { tracks: Track[] }) => (
    <ol className="list-inside bg-gray-200 rounded p-2">
        <li className="flex items-center my-1">
            <span className="flex-1">Tracks found: {tracks.length}</span>
            <button
                disabled={!tracks.length}
                onClick={() => add(...tracks)}
            >Add All</button>
        </li>
        {tracks.map(track =>
            <FoundItem key={track.href} track={track} />
        )}
    </ol>
)

export default FoundList
