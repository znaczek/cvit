import * as appEvents from './../../common/events/app.events';
import {history} from '../store/configureStore';
import {ROUTES} from '../constants/route';

export class AppEventHandler {
    public static handle(event: appEvents.types) {
        switch (event.type) {
            case appEvents.CREATE_NEW: {
                history.push(ROUTES.PROJECT);
            }
        }
    }
}
