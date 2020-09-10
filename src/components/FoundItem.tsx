import * as React from 'react';
import Track from '../model/Track';
import { add } from '../service';

interface Props extends React.HTMLProps<HTMLLIElement> {
    track: Track;
}

const FoundItem = ({ track }: Props) => (
    <li className="flex items-center group hover:bg-gray-300 p-1">
        <a href={track.href} target="_blank" className="flex-1 truncate">{track.title}</a>
        <button onClick={() => add(track)} className="hidden group-hover:inline">
            <i className="icon-plus-circled"></i>
        </button>
    </li>
)

export default FoundItem;
