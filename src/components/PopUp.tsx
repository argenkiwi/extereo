import * as React from 'react';
import { scan } from '../service';
import Message from '../model/Message';
import Track from '../model/Track';
import BaseComponent from './BaseComponent';
import Found from './Found';
import Playlist from './Playlist';
import './PopUp.css';

interface Props extends React.HTMLProps<HTMLDivElement>, BaseComponent.Props { }

class PopUp extends BaseComponent<Props, { tracks: Track[] }>{

    constructor(props: Props) {
        super(props);
        this.state = {
            tracks: []
        };
    }

    componentDidMount() {
        scan(tracks => this.setState({ tracks }));
    }

    render() {
        const { message$ } = this.props;
        const { tracks } = this.state;
        return (
            <div className="PopUp" style={{ width: tracks.length > 0 ? 640 : 320 }}>
                {tracks.length > 0 &&
                    <Found tracks={tracks} />
                }
                <Playlist message$={message$} />
            </div>
        );
    }
}

export default PopUp;