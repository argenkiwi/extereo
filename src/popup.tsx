import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEventPattern, Subject } from 'rxjs';
import Message from './model/Message';
import PopUp from './components/PopUp';
import './styles/tailwind.css';

const message$ = new Subject<Message>()

fromEventPattern((h: (message: Message) => void) => {
    chrome.runtime.onMessage.addListener(h)
}, (h: (message: Message) => void) => {
    chrome.runtime.onMessage.removeListener(h)
}, (message: Message) => message).subscribe(message$)

ReactDOM.render(
    <PopUp message$={message$} />,
    document.getElementById('root')
)
