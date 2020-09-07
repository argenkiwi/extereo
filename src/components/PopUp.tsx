import * as React from 'react';
import { scan } from '../service';
import Track from '../model/Track';
import BaseComponent from './BaseComponent';
import Found from './Found';
import Playlist from './Playlist';

interface Props extends React.HTMLProps<HTMLDivElement>, BaseComponent.Props { }

interface State {
    tracks: Track[]
}

class PopUp extends BaseComponent<Props, State>{

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
        const showFound = tracks && tracks.length > 0;
        return (
            <div
                className={`p-2 grid gap-2 ${showFound ? 'grid-cols-2' : 'grid-cols-1'}`}
                style={{ width: showFound ? 640 : 320, height: 360, }}>
                {showFound &&
                    <Found tracks={tracks} />
                }
                <Playlist message$={message$} />
            </div>
        );
    }
}

export default PopUp;
