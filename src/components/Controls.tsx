import * as React from 'react';
import  { previous, next, play, pause }  from '../service';

function Controls({ paused }: { paused: boolean }) {
    return (
        <div>
            <button onClick={() => previous()}>Prev</button>
            {paused
                ? <button onClick={() => play()}>Play</button>
                : <button onClick={() => pause()}>Pause</button>
            }
            <button onClick={() => next()}>Next</button>
        </div>
    );
}

export default Controls;