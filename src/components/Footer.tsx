import * as React from 'react';
import Track from '../model/Track';
import { clear } from '../service';

const Footer = ({ tracks }: { tracks: Track[] }) => (
    <div className="flex justify-end mt-1">
        <button
            disabled={!tracks.length}
            onClick={() => allowDownload(tracks)}
        >Export</button>
        <button
            className="ml-1"
            disabled={!tracks.length}
            onClick={() => clear()}
        >Clear</button>
    </div>
)

function allowDownload(tracks: Track[]) {
    chrome.permissions.contains({
        permissions: ['downloads']
    }, result => {
        if (result) {
            exportToHTML(tracks)
        } else {
            chrome.permissions.request({
                permissions: ['downloads']
            }, granted => {
                if (granted) exportToHTML(tracks)
            });
        }
    });
}

function exportToHTML(tracks: Track[]) {
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

    const blob = new Blob(['<!doctype html>', html.documentElement.outerHTML], {
        type: 'text/html'
    });

    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: 'playlist.html',
        saveAs: true
    });
}

export default Footer
