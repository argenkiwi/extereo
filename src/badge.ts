import { scan } from './service';

const callback = () => scan(tracks => {
    chrome.browserAction.setBadgeText({
        text: tracks && tracks.length ? `${tracks.length}` : ''
    });
})

chrome.tabs.onActivated.addListener(callback);
chrome.tabs.onUpdated.addListener(callback);
