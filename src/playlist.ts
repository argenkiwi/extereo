import { fromEventPattern, Subscription } from 'rxjs';
import { filter, last, map, withLatestFrom } from 'rxjs/operators';
import StateEventModel from './core/StateEventModel';
import PlayerEvent from './model/PlayerEvent';
import { playerModel } from './model/PlayerModel';
import PlaylistEvent from './model/PlaylistEvent';
import { playlistModel } from './model/PlaylistModel';
import Track from './model/Track';
import AudioPlayer from './player/AudioPlayer';
import Player from './player/Player';

const player: Player = new AudioPlayer()

player.event$.subscribe(event => playerModel.publish(event))

player.event$
    .pipe(filter(({ kind }) => Array.of(PlayerEvent.Kind.Ended, PlayerEvent.Kind.Error).includes(kind)))
    .subscribe(_ => playlistModel.publish({ kind: PlaylistEvent.Kind.Next }))

playerModel.eventObservable.subscribe(event => {
    switch (event.kind) {
        case PlayerEvent.Kind.Play:
            player.play()
            break
        case PlayerEvent.Kind.Pause:
            player.pause()
            break
        case PlayerEvent.Kind.Seek:
            player.seek(event.time)
            break
    }
})

const exportToHTML = (tracks: Track[]) => {
    const html = document.implementation.createHTMLDocument('Extereo Playlist');
    const ul = html.createElement('ol');
    tracks.forEach(track => {
        const li = html.createElement('li');
        const a = html.createElement('a');
        a.href = track.href;
        a.innerText = track.title;
        li.appendChild(a);
        ul.appendChild(li);
    });
    html.body.appendChild(ul);

    const blob = new Blob(['<!doctype html>', html.documentElement.outerHTML], {
        type: 'text/html'
    });

    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: 'playlist.html',
        saveAs: true
    });
}

playlistModel.eventObservable.pipe(
    filter(event => event.kind === PlaylistEvent.Kind.Export),
    withLatestFrom(playlistModel.stateObservable),
    map(([_, state]) => state)
).subscribe(function (state) {
    chrome.permissions.contains({
        permissions: ['downloads']
    }, result => {
        if (result) {
            exportToHTML(state.tracks)
        } else {
            chrome.permissions.request({
                permissions: ['downloads']
            }, granted => {
                if (granted) exportToHTML(state.tracks)
            });
        }
    })
})

playlistModel.stateObservable
    .pipe(map(({ position, tracks }) => position < tracks.length ? tracks[position] : null))
    .subscribe((track: Track) => player.load(track))

const configure = <S, E>(port: chrome.runtime.Port, model: StateEventModel<S, E>) => {
    const subscriptions: Subscription[] = [];

    subscriptions.push(fromEventPattern(
        h => port.onMessage.addListener(h),
        h => port.onMessage.removeListener(h)
    ).pipe(map(([e, _]: [E, any]) => e))
        .subscribe(e => model.publish(e)));

    subscriptions.push(model.stateObservable.subscribe(s => port.postMessage(s)));

    port.onDisconnect.addListener(_ => subscriptions.forEach(s => s.unsubscribe()));
}

chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
        case 'player':
            configure(port, playerModel)
            break
        case 'playlist':
            configure(port, playlistModel)
            break
    }
})

fromEventPattern(
    h => chrome.commands.onCommand.addListener(h),
    h => chrome.commands.onCommand.removeListener(h)
).subscribe(function (command) {
    switch (command) {
        case 'play-pause':
            player.toggle()
            break
        case 'prev-track':
            playlistModel.publish({ kind: PlaylistEvent.Kind.Previous })
            break
        case 'next-track':
            playlistModel.publish({ kind: PlaylistEvent.Kind.Next })
            break
    }
})
