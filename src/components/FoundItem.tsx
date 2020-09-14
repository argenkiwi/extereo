import * as React from 'react';
import PlaylistEvent from '../model/PlaylistEvent';
import Track from '../model/Track';

interface Props extends React.HTMLProps<HTMLLIElement> {
    track: Track;
    playlistPort: chrome.runtime.Port;
}

const FoundItem = ({ track, playlistPort }: Props) => (
    <li className="flex items-center group hover:bg-gray-300 p-1">
        <a href={track.href} target="_blank" className="flex-1 truncate">{track.title}</a>
        <button onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Add, tracks: [track] })} className="hidden group-hover:inline">
            <i className="icon-plus-circled"></i>
        </button>
    </li>
)

export default FoundItem;
