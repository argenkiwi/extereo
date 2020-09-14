import * as React from 'react';
import { useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import PlaylistEvent from '../model/PlaylistEvent';
import Track from '../model/Track';
import Handle from './Handle';

interface Props extends React.HTMLProps<HTMLLIElement> {
    isCurrent: boolean;
    track: Track;
    position: number;
    playlistPort: chrome.runtime.Port
}

const TrackListItem = ({ isCurrent, track, position, playlistPort }: Props) => {

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
            <button
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Jump, position })}
                disabled={isCurrent} className="ml-1 hidden group-hover:inline">
                <i className="icon-play-circled"></i>
            </button>
            <button
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Remove, position })}
                className="mx-1 hidden group-hover:inline">
                <i className="icon-cancel-circled"></i>
            </button>
            <Handle />
        </li>
    )
}

export default SortableElement<Props>(TrackListItem);
