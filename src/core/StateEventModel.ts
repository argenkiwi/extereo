import { Observable } from 'rxjs'
import { scan } from 'rxjs/operators'
import EventModel from './EventModel'

class StateEventModel<S, E> extends EventModel<E> {

    stateObservable: Observable<S>

    constructor(reducer: (state: S, event: E) => S, initialState: S) {
        super()
        this.stateObservable = this.eventObservable
            .pipe(scan(reducer, initialState))
    }
}

export default StateEventModel
