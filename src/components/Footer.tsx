import * as React from 'react';
import PlaylistEvent from '../model/PlaylistEvent';
import Track from '../model/Track';
import Button from './Button';

const Footer = ({ tracks, playlistPort }: {
    tracks: Track[],
    playlistPort: chrome.runtime.Port
}) => (
        <div className="flex justify-end mt-2">
            <Button
                disabled={!tracks.length}
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Export })}
            >Export</Button>
            <Button
                className="ml-1"
                disabled={!tracks.length}
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Clear })}
            >Clear</Button>
        </div>
    )

export default Footer
