import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { jump, remove } from '../service';
import Track from '../model/Track';
import Handle from './Handle';
import { useEffect } from 'react';

interface Props extends React.HTMLProps<HTMLLIElement> {
    isCurrent: boolean;
    track: Track;
    position: number;
}

const TrackListItem = ({ isCurrent, track, position }: Props) => {

    const ref = React.useRef(null)

    useEffect(() => {
        if (isCurrent) {
            ref.current.scrollIntoView()
        }
    }, [])

    return (
        <li ref={ref} className="flex items-center p-1 hover:bg-gray-300 group">
            <a href={track.href} target="_blank" className="flex-1 truncate">
                {isCurrent ?
                    <strong>{track.title}</strong> :
                    <span>{track.title}</span>}
            </a>
            <button onClick={() => jump(position)} disabled={isCurrent} className="ml-1 hidden group-hover:inline">
                <i className="icon-play-circled"></i>
            </button>
            <button onClick={() => remove(position)} className="mx-1 hidden group-hover:inline">
                <i className="icon-cancel-circled"></i>
            </button>
            <Handle />
        </li>
    )
}

export default SortableElement<Props>(TrackListItem);
