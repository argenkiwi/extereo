import * as React from "react";
import { jump } from '../service';
import Track from "../model/Track";
import TrackListItem from './TrackListItem';
import './TrackList.css';

interface Props extends React.HTMLProps<HTMLUListElement> {
    tracks: Track[];
    position: number;
}

function TrackList({ tracks, position }: Props) {
    return (
        <ol className="TrackList">{tracks.map((track, i) =>
            <TrackListItem
                key={track.href}
                position={i}
                playing={position == i}
                track={track}
            />
        )}</ol>
    );
}

export default TrackList;