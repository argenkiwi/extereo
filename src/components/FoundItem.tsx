import * as React from 'react';
import PlaylistEvent from '../model/PlaylistEvent';
import Track from '../model/Track';

interface Props extends React.HTMLProps<HTMLLIElement> {
  track: Track;
  playlistPort: chrome.runtime.Port;
}

const FoundItem = ({ track, playlistPort }: Props) => (
  <li className="flex items-center group hover:bg-gray-300 p-1">
    <button onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Add, tracks: [track] })} className="p-1 flex-1 text-left hover:text-blue-700 truncate">
      {track.title}
    </button>
    <a href={track.href} target="_blank" className="hidden group-hover:inline ml-2 text-blue-500 hover:text-blue-700 w-4 h-4">
      <svg x="0px" y="0px" viewBox="0 0 20 20" xmlSpace="preserve" >
        <path
          fill="currentColor"
          d="M7.859 14.691l-.81.805a1.814 1.814 0 01-2.545 0 1.762 1.762 0 010-2.504l2.98-2.955c.617-.613 1.779-1.515 2.626-.675a.992.992 0 101.397-1.407c-1.438-1.428-3.566-1.164-5.419.675l-2.98 2.956A3.719 3.719 0 002 14.244a3.72 3.72 0 001.108 2.658c.736.73 1.702 1.096 2.669 1.096s1.934-.365 2.669-1.096l.811-.805a.988.988 0 00.005-1.4.995.995 0 00-1.403-.006zm9.032-11.484c-1.547-1.534-3.709-1.617-5.139-.197l-1.009 1.002a.99.99 0 101.396 1.406l1.01-1.001c.74-.736 1.711-.431 2.346.197.336.335.522.779.522 1.252s-.186.917-.522 1.251l-3.18 3.154c-1.454 1.441-2.136.766-2.427.477a.99.99 0 10-1.396 1.406c.668.662 1.43.99 2.228.99.977 0 2.01-.492 2.993-1.467l3.18-3.153A3.732 3.732 0 0018 5.866a3.726 3.726 0 00-1.109-2.659z"
        />
      </svg>
    </a>
  </li>
)

export default FoundItem;
