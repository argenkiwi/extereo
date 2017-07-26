import * as React from 'react';
import { Observable } from 'rxjs';
import Message from '../model/Message';
import Track from '../model/Track';
import { add } from '../service';
import { regexExt, regexM3U } from '../filters';
import FoundItem from './FoundItem';
import PlaylistItem from './PlaylistItem';
import './Found.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
    tracks: Track[]
}

function Found(props: Props) {
    const tracks = props.tracks.filter(({ href }) => regexExt.test(href));
    const playlists = props.tracks.filter(({ href }) => regexM3U.test(href));
    return (
        <div className="Found">
            <strong>ON THIS PAGE</strong>
            <button
                disabled={!tracks.length}
                onClick={() => add(...tracks)}
            >Add All</button>
            <div>
                {tracks.length > 0 &&
                    <ol>{tracks.map(track =>
                        <FoundItem key={track.href} track={track} />
                    )}</ol>
                }
                {playlists.length > 0 && playlists.map(playlist =>
                    <PlaylistItem key={playlist.href} track={playlist} />
                )}
            </div>
        </div>
    );
}

export default Found;