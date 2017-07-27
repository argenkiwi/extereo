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
    const urls = tracks.map(track => track.href).join('\n');
    const blob = new Blob([urls], {
        type: 'application/x-mpegurl'
    });
    chrome.downloads.download({
        url: window.URL.createObjectURL(blob),
        filename: 'playlist.m3u'
    });
}

export default Footer;