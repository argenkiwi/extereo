import Message from './model/Message';
import Track from './model/Track';
import { regexExt, regexType, regexM3U } from './filters';

const map: Map<string, string> = new Map();

const toTitle = (uri: string) =>
    decodeURIComponent(uri.substring(uri.lastIndexOf('/') + 1));

Array.from(document.querySelectorAll("a"))
    .filter(a => regexType.test(a.type) || regexExt.test(a.href) || regexM3U.test(a.href))
    .forEach(a => map.set(a.href, a.textContent ? a.textContent.trim() : toTitle(a.href)));

Array.from(document.querySelectorAll("audio"))
    .filter(audio => regexExt.test(audio.src))
    .forEach(audio => map.set(audio.src, toTitle(audio.src)));

Array.from(document.querySelectorAll("source"))
    .filter(source => regexType.test(source.type) || regexExt.test(source.src))
    .forEach(source => map.set(source.src, toTitle(source.src)));

const tracks = Array.from(map, pair => ({ href: pair[0], title: pair[1] }));

chrome.runtime.onMessage
    .addListener((message: Message, sender: any, callback: (tracks: Track[]) => void) => {
        if (message.kind === Message.Kind.Scan) callback(tracks);
    });
