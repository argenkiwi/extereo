import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { jump, remove } from '../service';
import Track from '../model/Track';
import Handle from './Handle';
import { useEffect } from 'react';

interface Props extends React.HTMLProps<HTMLLIElement> {
    playing: boolean;
    track: Track;
    position: number;
}

const TrackListItem = ({ playing, track, position }: Props) => {

    const myRef = React.useRef(null)

    useEffect(() => {
        if (playing) {
            myRef.current.scrollIntoView()
        }
    }, []);

    return (
        <li ref={myRef} className="flex items-center p-1 hover:bg-gray-300 group">
            <a href={track.href} target="_blank" className="flex-1 truncate">
                {playing ?
                    <strong>{track.title}</strong> :
                    <span>{track.title}</span>}
            </a>
            <button onClick={() => jump(position)} disabled={playing} className="ml-1 hidden group-hover:inline">
                <i className="icon-play-circled"></i>
            </button>
            <button onClick={() => remove(position)} className="mx-1 hidden group-hover:inline">
                <i className="icon-cancel-circled"></i>
            </button>
            <Handle />
        </li>
    );
}

export default SortableElement<Props>(TrackListItem);
