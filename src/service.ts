import Message from './model/Message'
import Track from './model/Track'

export function scan(callback: (response: Track[]) => void) {
  chrome.tabs?.query({
    active: true,
    currentWindow: true
  }, tabs => tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
    kind: Message.Kind.Scan
  }, callback)))
}
