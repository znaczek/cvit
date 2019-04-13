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

    public subscribe<T>(callback: EventBusListener): Subscription {
        if (!Assertions.isFunction(callback)) {
            throw Error('Uncorrect callback type - expected "function", got: ' + typeof callback);
        }


        this.emitter.addListener(APP_EVENT, callback);

        return new Subscription(this.getUnsubscribeFunction(callback));
    }

    private getUnsubscribeFunction(callback: EventBusListener) {
        return () => {
            this.emitter.removeListener(APP_EVENT, callback);
        }
    }
}

export const EventBus = new EventBusModel();
