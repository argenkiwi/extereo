import { Component } from 'react';
import { Observable, Subscription } from 'rxjs';
import Message from '../model/Message';

declare module BaseComponent {
    export interface Props {
        message$: Observable<Message>
    }
}

abstract class BaseComponent<P extends BaseComponent.Props, S> extends Component<P, S> {
    subscriptions: Subscription[] = []

    componentWillUnmount() {
        while (this.subscriptions.length) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}

export default BaseComponent;
