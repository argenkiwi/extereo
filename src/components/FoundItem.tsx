import * as React from 'react';
import Track from '../model/Track';
import { add } from '../service';
import { regexM3U, regexExt } from '../filters';
import './FoundItem.css';

interface Props extends React.HTMLProps<HTMLLIElement> {
    track: Track;
}

function FoundItem({ track }: Props) {
    return (
        <li className="FoundItem">
            <a href={track.href} target="_blank">{track.title}</a>
            <button onClick={() => add(track)}>+</button>
        </li>
    );
}

export default FoundItem;