import { Observable, Subject } from 'rxjs'
import { scan } from 'rxjs/operators'
import EventModel from './EventModel'

class StateEventModel<S, E> extends EventModel<E> {

    private stateSubject = new Subject<S>()
    stateObservable: Observable<S> = this.stateSubject

    constructor(reducer: (state: S, event: E) => S, initialState: S) {
        super()
        this.eventObservable
            .pipe(scan(reducer, initialState))
            .subscribe(this.stateSubject)
    }
}

export default StateEventModel
