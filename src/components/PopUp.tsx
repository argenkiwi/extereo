import * as React from 'react';
import { scan } from '../service';
import Found from './Found';
import './PopUp.css';

const PopUp = () => {
    const [tracks, setTracks] = React.useState([])

    React.useEffect(() => {
        scan(tracks => setTracks(tracks))
    })

    return (
        <div className="PopUp">
            {tracks && tracks.length > 0 &&
                <Found tracks={tracks} />
            }
        </div>
    );
}

export default PopUp;
