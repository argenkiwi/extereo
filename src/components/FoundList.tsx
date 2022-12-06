import * as React from 'react';
import PlaylistEvent from '../model/PlaylistEvent';
import Track from '../model/Track';
import Button from './Button';
import FoundItem from './FoundItem';

const FoundList = ({ tracks, playlistPort }: {
  tracks: Track[],
  playlistPort: chrome.runtime.Port
}) =>
  <ol className="list-inside bg-gray-200 rounded p-2">
    <li className="flex items-center my-1">
      <span className="flex-1">Tracks found: {tracks.length}</span>
      <Button
        disabled={!tracks.length}
        onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Add, tracks })}
      >Add All</Button>
    </li>
    {tracks.map(track =>
      <FoundItem key={track.href} track={track} playlistPort={playlistPort} />
    )}
  </ol>

export default FoundList
