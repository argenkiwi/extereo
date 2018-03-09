import { Subject, Observable } from 'rxjs';

class EventModel<E> {
    private eventSubject: Subject<E> = new Subject()
    eventObservable: Observable<E> = this.eventSubject

    publish(event: E): void {
        this.eventSubject.next(event)
    }
}

export default EventModel
