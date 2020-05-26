import * as React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { jump, remove } from '../service';
import Track from '../model/Track';
import './TrackListItem.css';

interface Props extends React.HTMLProps<HTMLLIElement> {
    playing: boolean;
    track: Track;
    position: number;
}

const Handle = SortableHandle(() => <span className="Handle" />);

const TrackListItem = ({ playing, track, position }: Props) => (
    <li className="TrackListItem">
        <a href={track.href} target="_blank">
            {playing ?
                <strong>{track.title}</strong> :
                <span>{track.title}</span>
            }
        </a>
        <button onClick={() => jump(position)} disabled={playing}>
            <i className="icon-play-circled"></i>
        </button>
        <button onClick={() => remove(position)}>
            <i className="icon-cancel-circled"></i>
        </button>
        <Handle />
    </li>
)

export default SortableElement<Props>(TrackListItem);
