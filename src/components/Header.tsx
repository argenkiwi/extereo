import * as React from 'react';
import { previous, next, play, pause } from '../service';

const Header = ({ paused }: { paused: boolean }) => (
    <div className="flex">
        <strong className="flex-1">PLAYLIST</strong>
        <button onClick={() => previous()} className="ml-1">
            <i className="icon-prev"></i>
        </button>
        {paused ?
            <button onClick={() => play()} className="ml-1">
                <i className="icon-play"></i>
            </button> :
            <button onClick={() => pause()} className="ml-1">
                <i className="icon-pause"></i>
            </button>
        }
        <button onClick={() => next()} className="ml-1">
            <i className="icon-next"></i>
        </button>
    </div>
)

export default Header
