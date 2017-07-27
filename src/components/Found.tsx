import * as React from 'react';
import { Observable } from 'rxjs';
import Message from '../model/Message';
import Track from '../model/Track';
import { regexExt, regexM3U } from '../filters';
import FoundList from './FoundList';
import PlaylistItem from './PlaylistItem';
import './Found.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
    tracks: Track[]
}

function Found(props: Props) {
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
    );
}

export default Found;