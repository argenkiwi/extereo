import * as React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import Track from "../model/Track";
import TrackListItem from './TrackListItem';
import './TrackList.css';

interface Props {
    tracks: Track[]
    position: number
}

const TrackList = ({ tracks, position }: Props) =>
    <ol className="TrackList">
        {tracks.map((track, i) =>
            <TrackListItem
                index={i}
                key={track.href}
                position={i}
                playing={position == i}
                track={track} />
        )}
    </ol>

export default SortableContainer<Props>(TrackList)
