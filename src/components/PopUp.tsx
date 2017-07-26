import * as React from 'react';
import { scan } from '../service';
import Message from '../model/Message';
import Track from '../model/Track';
import BaseComponent from './BaseComponent';
import Found from './Found';
import Playlist from './Playlist';

interface Props extends React.HTMLProps<HTMLDivElement>, BaseComponent.Props { }

class PopUp extends BaseComponent<Props, { tracks: Track[] }>{

    constructor(props:Props) {
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
        return (tracks && tracks.length ?
            <div style={{ width: 640, display: 'flex' }}>
                <Found tracks={tracks} />
                <Playlist message$={message$} />
            </div> :
            <div style={{ width: 320 }}>
                <Playlist message$={message$} />
            </div>
        );
    }
}

export default PopUp;