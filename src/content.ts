import Message from './model/Message';
import Track from './model/Track';
import { found } from './service';
import { regexExt, regexType, regexM3U } from './filters';

const toTitle = (uri: string) =>
    decodeURIComponent(uri.substring(uri.lastIndexOf('/') + 1));

const anchors = Array.from(document.querySelectorAll("a"));

const tracks = [
    ...anchors
        .filter(a => regexType.test(a.type) || regexExt.test(a.href) || regexM3U.test(a.href))
        .map(a => ({
            title: a.textContent
                ? a.textContent.trim()
                : toTitle(a.href),
            href: a.href
        })),
    ...Array.from(document.querySelectorAll("audio"))
        .filter(audio => regexExt.test(audio.src))
        .map(audio => ({
            title: toTitle(audio.src),
            href: audio.src
        })),
    ...Array.from(document.querySelectorAll("source"))
        .filter(source => regexType.test(source.type) || regexExt.test(source.src))
        .map(source => ({
            title: toTitle(source.src),
            href: source.src
        }))
];

chrome.runtime.onMessage
    .addListener((message: Message<any>, sender: any, callback: (tracks: Track[]) => void) => {
        if (message.type === Message.Type.Scan) callback(tracks);
    });
