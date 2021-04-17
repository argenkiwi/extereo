import { scan } from './service';

const callback = (tabId: number) => scan(tracks => {
    if (tracks && tracks.length) {
        chrome.action.enable(tabId);
        chrome.action.setTitle({ tabId: tabId, title: "See tracks." });
        chrome.action.setBadgeText({ text: `${tracks.length}`, tabId: tabId })
    } else {
        chrome.action.disable(tabId)
    }
})

chrome.tabs.onActivated.addListener((info: chrome.tabs.TabActiveInfo) => callback(info.tabId));
chrome.tabs.onUpdated.addListener((tabId: number) => callback(tabId));
