import * as React from 'react';
import Track from '../model/Track';
import { clear } from '../service';
import './Footer.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
    tracks: Track[];
}

function Footer({ tracks }: Props) {
    return (
        <div className="Footer">
            <button
                disabled={!tracks.length}
                onClick={() => allowExportToM3U(tracks)}
            >Export</button>
            <button
                disabled={!tracks.length}
                onClick={() => clear()}
            >Clear</button>
        </div>
    );
}

function allowExportToM3U(tracks: Track[]) {
    chrome.permissions.request({
        permissions: ['downloads']
    }, function (granted) {
        if (granted) exportToM3U(tracks);
    });
}

function exportToM3U(tracks: Track[]) {
    const html = document.implementation.createHTMLDocument('Extereo Playlist');
    const ul = html.createElement('ol');
    tracks.forEach(track => {
        const li = html.createElement('li');
        const a = html.createElement('a');
        a.href = track.href;
        a.innerText = track.title;
        li.appendChild(a);
        ul.appendChild(li);
    });
    html.body.appendChild(ul);

    const blob = new Blob([html.documentElement.outerHTML], {
        type: 'text/html'
    });

    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: 'playlist.html'
    });
}

export default Footer;