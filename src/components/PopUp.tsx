import * as React from 'react';
import { scan } from '../service';
import Track from '../model/Track';
import Found from './Found';
import Playlist from './Playlist';
import './PopUp.css';
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

    return (
        <div className="PopUp" style={{
            gridTemplateColumns: tracks && tracks.length > 0 ? '320px 320px' : '320px'
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
