import * as React from 'react';
import Track from '../model/Track';
import { regexM3U } from '../filters';
import FoundList from './FoundList';
import PlaylistItem from './PlaylistItem';

const Found = (props: { tracks: Track[] }) => {
    const tracks = props.tracks.filter(({ href }) => !regexM3U.test(href));
    const playlists = props.tracks.filter(({ href }) => regexM3U.test(href));
    return (
        <div className="flex flex-col">
            <strong className="mb-2">ON THIS PAGE</strong>
            <div className="flex-1 overflow-auto">
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
