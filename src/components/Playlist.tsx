import * as React from 'react';
import PlayerEvent from '../model/PlayerEvent';
import PlayerState from '../model/PlayerState';
import PlaylistEvent from '../model/PlaylistEvent';
import PlaylistState from '../model/PlaylistState';
import Footer from './Footer';
import Header from './Header';
import SeekBar from './SeekBar';
import TrackList from './TrackList';

const Playlist = ({ playerPort, playlistPort }: {
  playerPort: chrome.runtime.Port,
  playlistPort: chrome.runtime.Port
}) => {

  const [playerState, setPlayerState] = React.useState({
    duration: 0,
    elapsed: 0,
    paused: true
  } as PlayerState)

  React.useEffect(() => {
    playerPort?.onMessage.addListener((s) => console.log(s))
    playerPort?.onMessage.addListener((s) => setPlayerState(s))
    return () => playerPort?.onMessage.removeListener(setPlayerState)
  }, [playerPort])

  const [playlistState, setPlaylistState] = React.useState({
    position: 0,
    tracks: []
  } as PlaylistState)

  React.useEffect(() => {
    playlistPort?.onMessage.addListener((s) => setPlaylistState(s))
    return () => playlistPort?.onMessage.removeListener(setPlaylistState)
  }, [playlistPort])

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Header
        paused={playerState.paused}
        current={playlistState.position}
        total={playlistState.tracks.length}
        playerPort={playerPort}
        playlistPort={playlistPort} />
      <SeekBar
        elapsed={playerState.elapsed}
        duration={playerState.duration}
        onSeek={time => playerPort?.postMessage({ kind: PlayerEvent.Kind.Seek, time })} />
      <TrackList
        position={playlistState.position}
        tracks={playlistState.tracks}
        onSortEnd={({ oldIndex, newIndex }) => playlistPort.postMessage({
          kind: PlaylistEvent.Kind.Sort,
          from: oldIndex,
          to: newIndex
        })}
        useDragHandle={true}
        playlistPort={playlistPort} />
      <Footer tracks={playlistState.tracks} playlistPort={playlistPort} />
    </div>
  )
}

export default Playlist;
