import * as React from 'react';
import { jump, remove } from '../service';
import Track from '../model/Track';
import './TrackListItem.css';

interface Props extends React.HTMLProps<HTMLLIElement> {
    playing: boolean;
    track: Track;
    position: number;
}

function TrackListItem({ playing, track, position }: Props) {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        jump(position);
    };

    return (
        <li className="TrackListItem">
            {playing
                ? <strong>{track.title}</strong>
                : <span>{track.title}</span>}
            <button onClick={() => jump(position)} disabled={playing}>P</button>
            <button onClick={() => remove(position)}>X</button>
        </li >
    );
}

export default TrackListItem;