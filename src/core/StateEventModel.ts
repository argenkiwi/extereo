import { Observable } from 'rxjs'
import EventModel from './EventModel'

class StateEventModel<S, E> extends EventModel<E> {

    stateObservable: Observable<S>

    constructor(reducer: (state: S, event: E) => S, initialState: S) {
        super()
        this.stateObservable = this.eventObservable.scan(reducer, initialState)
    }
}

export default StateEventModel
