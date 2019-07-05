import * as React from 'react';
import './SeekBar.css';

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

class SeekBar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            elapsed: props.elapsed,
            duration: props.duration,
            seeking: false
        };
    }

    componentWillReceiveProps(props: Props) {
        !this.state.seeking && this.setState({
            elapsed: props.elapsed,
            duration: props.duration
        });
    }

    render() {
        const precision = 1000;
        const { onSeek, onSeeking } = this.props;
        const { duration, elapsed } = this.state;

        const onMouseDown = () => this.setState({
            seeking: true,
            duration,
            elapsed
        });

        const onMouseUp = () => {
            this.setState({ seeking: false });
            if (onSeek) onSeek(this.state.elapsed);
        };

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number.parseInt(event.target.value);
            const time = value * duration / precision;

            this.setState({ elapsed: time });
            if (onSeeking) onSeeking(this.state.elapsed);
        };

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
        );
    }
}

function format(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export default SeekBar
