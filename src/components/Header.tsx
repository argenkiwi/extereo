import * as React from 'react';
import { previous, next, play, pause } from '../service';

const Header = ({ paused, current, total }: {
    paused: boolean,
    current: number,
    total: number
}) => (
        <div className="flex">
            <strong className="flex-1">PLAYLIST</strong>
            <button onClick={() => previous()} disabled={current <= 0} className="disabled:opacity-50">
                <i className="icon-prev"></i>
            </button>
            {paused ?
                <button onClick={() => play()} className="ml-1 disabled:opacity-50" disabled={total == 0}>
                    <i className="icon-play"></i>
                </button> :
                <button onClick={() => pause()} className="ml-1 disabled:opacity-50" disabled={total == 0}>
                    <i className="icon-pause"></i>
                </button>
            }
            <button onClick={() => next()} disabled={current >= total - 1} className="ml-1 disabled:opacity-50">
                <i className="icon-next"></i>
            </button>
        </div>
    )

export default Header
