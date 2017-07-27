import * as React from 'react';
import { previous, next, play, pause } from '../service';
import './Header.css';

function Header({ paused }: { paused: boolean }) {
    return (
        <div className="Header">
            <strong>PLAYLIST</strong>
            <button onClick={() => previous()}>Prev</button>
            {paused
                ? <button onClick={() => play()}>Play</button>
                : <button onClick={() => pause()}>Pause</button>
            }
            <button onClick={() => next()}>Next</button>
        </div>
    );
}

export default Header;