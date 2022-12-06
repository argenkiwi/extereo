import * as React from 'react';
import { scan } from '../service';
import Found from './Found';
import Playlist from './Playlist';

const PopUp = () => {
  const [tracks, setTracks] = React.useState([])

  React.useEffect(() => {
    scan(tracks => setTracks(tracks))
  }, [])

  const [playerPort, setPlayerPort] = React.useState<chrome.runtime.Port>()

  React.useEffect(() => {
    console.log("Connect to player port.")
    const playerPort = chrome.runtime.connect({ name: 'player' })
    setPlayerPort(playerPort)
    return () => {
      console.log("Cleanup player port.")
      setPlayerPort(null)
      playerPort.disconnect()
    }
  }, [])

  const [playlistPort, setPlaylistPort] = React.useState<chrome.runtime.Port>()

  React.useEffect(() => {
    console.log("Connect to playlist port.")
    const playlistPort = chrome.runtime.connect({ name: 'playlist' })
    setPlaylistPort(playlistPort)
    return () => {
      console.log("Cleanup playlist port.")
      setPlaylistPort(null)
      playlistPort.disconnect()
    }
  }, [])

  const showFound = tracks && tracks.length > 0

  return (
    <div className={`p-2 overflow-y-hidden ${showFound ? 'grid gap-2 grid-cols-2' : ''}`} style={{
      width: showFound ? '640px' : '320px',
      height: '360px'
    }}>
      {tracks && tracks.length > 0 &&
        <Found tracks={tracks} playlistPort={playlistPort} />
      }
      <Playlist playerPort={playerPort} playlistPort={playlistPort} />
    </div>
  );
}

export default PopUp;
