import * as React from 'react';
import PlayerEvent from '../model/PlayerEvent';
import PlaylistEvent from '../model/PlaylistEvent';

const Header = ({ paused, current, total, playerPort, playlistPort }: {
    paused: boolean,
    current: number,
    total: number,
    playerPort: chrome.runtime.Port,
    playlistPort: chrome.runtime.Port
}) => (
        <div className="flex">
            <strong className="flex-1">PLAYLIST</strong>
            <button
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Previous })}
                disabled={current <= 0}
                className="disabled:opacity-50">
                <i className="icon-prev"></i>
            </button>
            {paused ?
                <button
                    onClick={() => playerPort.postMessage({ kind: PlayerEvent.Kind.Play })}
                    className="ml-1 disabled:opacity-50"
                    disabled={total == 0}>
                    <i className="icon-play"></i>
                </button> :
                <button
                    onClick={() => playerPort.postMessage({ kind: PlayerEvent.Kind.Pause })}
                    className="ml-1 disabled:opacity-50"
                    disabled={total == 0}>
                    <i className="icon-pause"></i>
                </button>
            }
            <button
                onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Next })}
                disabled={current >= total - 1}
                className="ml-1 disabled:opacity-50">
                <i className="icon-next"></i>
            </button>
        </div>
    )

export default Header
