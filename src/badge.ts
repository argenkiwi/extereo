import Track from './model/Track';
import { scan } from './service';

const updateBadge = (tracks: Track[]) => {
    chrome.browserAction.setBadgeText({
        "text": tracks && tracks.length ? `${tracks.length}` : ''
    });
}

chrome.tabs.onActivated.addListener(() => scan(updateBadge));
chrome.tabs.onUpdated.addListener(() => scan(updateBadge));
