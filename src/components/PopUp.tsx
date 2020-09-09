import * as React from 'react';
import { scan } from '../service';
import Track from '../model/Track';
import Found from './Found';
import Playlist from './Playlist';
import { Observable } from 'rxjs';
import Message from '../model/Message';

interface Props extends React.HTMLProps<HTMLDivElement> {
    message$: Observable<Message>
}

const PopUp = ({ message$ }: Props) => {
    const [tracks, setTracks] = React.useState([])

    React.useEffect(() => {
        scan(tracks => setTracks(tracks))
    })

    const showFound = tracks && tracks.length > 0
    return (
        <div className={`p-2 overflow-y-hidden ${showFound ? 'grid gap-2 grid-cols-2' : ''}`} style={{
            width: showFound ? '640px' : '320px',
            height: '360px'
        }}>
            {tracks && tracks.length > 0 &&
                <Found tracks={tracks} />
            }
            <Playlist message$={message$} />
        </div>
    );
}

interface State {
    tracks: Track[]
}

export default PopUp;
