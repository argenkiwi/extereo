import * as React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import Track from "../model/Track";
import TrackListItem from './TrackListItem';
import './TrackList.css';

interface Props {
    tracks: Track[]
    position: number
}

const TrackList = ({ tracks, position }: Props) => (
    <ol className="TrackList flex-1 mt-1">
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
