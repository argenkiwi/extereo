import * as React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import Track from "../model/Track";
import TrackListItem from './TrackListItem';

interface Props {
    tracks: Track[]
    position: number
}

const TrackList = ({ tracks, position }: Props) => (
    <ol className="flex-1 mt-1 overflow-auto list-inside p-2 bg-gray-200">
        {tracks.map((track, i) =>
            <TrackListItem
                index={i}
                key={track.href}
                position={i}
                playing={position == i}
                track={track} />
        )}
    </ol>
)

export default SortableContainer<Props>(TrackList)
