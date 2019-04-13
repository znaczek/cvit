import {store} from '../index';
import {AppEvents} from '../../common/events/app.events';

export class PreviewEventHandler {
    public static handle(event: AppEvents.types) {
        const {dispatch} = store;
        console.log('handle preview', event);
        switch (event.type) {
            case AppEvents.TYPES.PROJECT_OPEN: {
                console.log(event.payload);
                return;
            }
        }
    }
}
