import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { scan } from 'rxjs/operators'
import EventModel from './EventModel'

class StateEventModel<S, E> extends EventModel<E> {

    private stateSubject: Subject<S>;
    stateObservable: Observable<S>;

    constructor(reducer: (state: S, event: E) => S, initialState: S) {
        super()
        this.stateSubject = new BehaviorSubject(initialState);
        this.stateObservable = this.stateSubject;
        this.eventObservable
            .pipe(scan(reducer, initialState))
            .subscribe(this.stateSubject)
    }
}

export default StateEventModel
