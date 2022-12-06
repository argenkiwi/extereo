import * as React from 'react';

interface Props {
  duration: number;
  elapsed: number;
  onSeek?: (time: number) => void;
  onSeeking?: (time: number) => void;
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

  const onPointerDown = () => setSeeking(true)

  const onPointerUp = () => {
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
    <div className="mt-1 bg-gray-200 rounded p-2">
      <input className="w-full"
        type="range"
        max={precision}
        step={.2}
        value={duration > 0 ? elapsed * precision / duration : 0}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onChange={onChange}
      />
      <div className="flex justify-between">
        <span>{format(Math.round(elapsed))}</span>
        <span>{format(Math.round(duration) - Math.round(elapsed))}</span>
      </div>
    </div>
  )
}

function format(seconds: number) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export default SeekBar
