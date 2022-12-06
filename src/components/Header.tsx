import * as React from 'react';
import PlayerEvent from '../model/PlayerEvent';
import PlaylistEvent from '../model/PlaylistEvent';

const Header = ({ paused, current, total, playerPort, playlistPort }: {
  paused: boolean,
  current: number,
  total: number,
  playerPort: chrome.runtime.Port,
  playlistPort: chrome.runtime.Port
}) => (
  <div className="flex">
    <strong className="flex-1">PLAYLIST</strong>
    <button
      onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Previous })}
      disabled={current <= 0}
      className="disabled:opacity-50 text-black w-4 h-4">
      <svg x="0px" y="0px" viewBox="0 0 20 20" xmlSpace="preserve">
        <path
          fill="currentColor"
          d="M14.959 4.571L7.756 9.52s-.279.201-.279.481.279.479.279.479l7.203 4.951c.572.38 1.041.099 1.041-.626V5.196c0-.727-.469-1.008-1.041-.625zM6 4H5c-.553 0-1 .048-1 .6v10.8c0 .552.447.6 1 .6h1c.553 0 1-.048 1-.6V4.6c0-.552-.447-.6-1-.6z"
        />
      </svg>
    </button>
    {paused ?
      <button
        onClick={() => playerPort.postMessage({ kind: PlayerEvent.Kind.Play })}
        className="ml-1 disabled:opacity-50 text-black w-4 h-4"
        disabled={total == 0}>
        <svg x="0px" y="0px" viewBox="0 0 20 20" xmlSpace="preserve" >
          <path
            fill="currentColor"
            d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z"
          />
        </svg>
      </button> :
      <button
        onClick={() => playerPort.postMessage({ kind: PlayerEvent.Kind.Pause })}
        className="ml-1 disabled:opacity-50  text-black w-4 h-4"
        disabled={current < 0 || current >= total}>
        <svg x="0px" y="0px" viewBox="0 0 20 20" xmlSpace="preserve">
          <path
            fill="currentColor"
            d="M15 3h-2c-.553 0-1 .048-1 .6v12.8c0 .552.447.6 1 .6h2c.553 0 1-.048 1-.6V3.6c0-.552-.447-.6-1-.6zM7 3H5c-.553 0-1 .048-1 .6v12.8c0 .552.447.6 1 .6h2c.553 0 1-.048 1-.6V3.6c0-.552-.447-.6-1-.6z"
          />
        </svg>
      </button>
    }
    <button
      onClick={() => playlistPort.postMessage({ kind: PlaylistEvent.Kind.Next })}
      disabled={current >= total - 1}
      className="ml-1 disabled:opacity-50 text-black w-4 h-4">
      <svg x="0px" y="0px" viewBox="0 0 20 20" xmlSpace="preserve">
        <path
          fill="currentColor"
          d="M12.244 9.52L5.041 4.571C4.469 4.188 4 4.469 4 5.196v9.609c0 .725.469 1.006 1.041.625l7.203-4.951s.279-.199.279-.478c0-.28-.279-.481-.279-.481zM14 4h1c.553 0 1 .048 1 .6v10.8c0 .552-.447.6-1 .6h-1c-.553 0-1-.048-1-.6V4.6c0-.552.447-.6 1-.6z"
        />
      </svg>
    </button>
  </div>
)

export default Header
