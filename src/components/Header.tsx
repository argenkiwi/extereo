import * as React from 'react';
import { previous, next, play, pause } from '../service';
import './Header.css';

const Header = ({ paused }: { paused: boolean }) =>
    <div className="Header">
        <strong>PLAYLIST</strong>
        <button onClick={() => previous()}>
            <i className="icon-prev"></i>
        </button>
        {paused ?
            <button onClick={() => play()}>
                <i className="icon-play"></i>
            </button> :
            <button onClick={() => pause()}>
                <i className="icon-pause"></i>
            </button>
        }
        <button onClick={() => next()}>
            <i className="icon-next"></i>
        </button>
    </div>

export default Header
