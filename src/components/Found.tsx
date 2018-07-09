import * as React from 'react';
import Track from '../model/Track';
import { regexM3U } from '../filters';
import FoundList from './FoundList';
import PlaylistItem from './PlaylistItem';
import './Found.css';

const Found = (props: { tracks: Track[] }) => {
    const tracks = props.tracks.filter(({ href }) => !regexM3U.test(href));
    const playlists = props.tracks.filter(({ href }) => regexM3U.test(href));
    return (
        <div className="Found">
            <strong>ON THIS PAGE</strong>
            <div>
                {tracks.length > 0 &&
                    <FoundList tracks={tracks} />
                }
                {playlists.length > 0 && playlists.map(playlist =>
                    <PlaylistItem key={playlist.href} track={playlist} />
                )}
            </div>
        </div>
    )
}

export default Found
