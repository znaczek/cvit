import {AppEvents} from '../../common/events/app.events';
import {Subscription} from '../../common/model/subscription.model';
import {EventEmitter} from 'events';
import {APP_EVENT} from '../../common/constants';
import {Assertions} from '../../common/utils/assertion.utils';

export type EventBusListener = (event: AppEvents.types) => void;

class EventBusModel {

    private emitter: EventEmitter = new EventEmitter();

    public emit(event: AppEvents.types) {
        this.emitter.emit(APP_EVENT, event);
    }

    public subscribe<T>(callback: EventBusListener, eventType?: AppEvents.TYPES): Subscription {
        if (!Assertions.isFunction(callback)) {
            throw Error('Uncorrect callback type - expected "function", got: ' + typeof callback);
        }
        this.emitter.on(APP_EVENT, (event: AppEvents.types) => {
            if (!eventType || eventType === event.type) {
                callback(event);
            }
        });

        return new Subscription(this.getUnsubscribeFunction(callback));
    }

    private getUnsubscribeFunction(callback: EventBusListener) {
        return () => {
            this.emitter.off(APP_EVENT, callback);
        }
    }
}

export const EventBus = new EventBusModel();
