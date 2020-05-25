import * as React from 'react';
import './SeekBar.css';
import StateEventModel from '../core/StateEventModel';

interface Props {
    duration: number;
    elapsed: number;
    onSeek?: (time: number) => void;
    onSeeking?: (time: number) => void;
}

interface State {
    duration: number;
    elapsed: number;
    seeking: boolean;
}

const SeekBar = (props: Props) => {

    const [elapsed, setElapsed] = React.useState(props.elapsed)
    const [duration, setDuration] = React.useState(props.duration)
    const [seeking, setSeeking] = React.useState(false)

    React.useEffect(() => {
        if (!seeking) {
            setElapsed(props.elapsed)
            setDuration(props.duration)
        }
    })

    const precision = 1000;
    const { onSeek, onSeeking } = props;

    const onMouseDown = () => setSeeking(true)

    const onMouseUp = () => {
        setSeeking(false)
        if (onSeek) onSeek(elapsed)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value)
        const time = value * duration / precision

        setElapsed(time)
        if (onSeeking) onSeeking(elapsed)
    }

    return (
        <div className="SeekBar">
            <input
                type="range"
                max={precision}
                step={.2}
                value={elapsed * precision / duration}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onChange={onChange}
            />
            <span>{format(Math.round(elapsed))}</span>
            <span>{format(Math.round(duration) - Math.round(elapsed))}</span>
        </div>
    )
}

function format(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export default SeekBar
