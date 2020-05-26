import * as React from 'react';
import Track from '../model/Track';
import { add } from '../service';
import './FoundItem.css';

interface Props extends React.HTMLProps<HTMLLIElement> {
    track: Track;
}

const FoundItem = ({ track }: Props) => (
    <li className="FoundItem">
        <a href={track.href} target="_blank">{track.title}</a>
        <button onClick={() => add(track)}>
            <i className="icon-plus-circled"></i>
        </button>
    </li>
)

export default FoundItem;
