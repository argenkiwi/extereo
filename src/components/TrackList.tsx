import * as React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import Track from "../model/Track";
import TrackListItem from './TrackListItem';

interface Props {
    tracks: Track[]
    position: number,
    playlistPort: chrome.runtime.Port
}

const TrackList = ({ tracks, position, playlistPort }: Props) => (
    <ol className="flex-1 mt-1 overflow-auto list-inside bg-gray-200 rounded p-2">
        {tracks.map((track, i) =>
            <TrackListItem
                index={i}
                key={track.href}
                position={i}
                isCurrent={position == i}
                track={track}
                playlistPort={playlistPort}
            />
        )}
    </ol>
)

export default SortableContainer<Props>(TrackList)
