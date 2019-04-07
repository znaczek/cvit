import * as appEvents from './../../common/events/app.events';
import {MainStateInterface} from '../interfaces/main-state.interface';


export class MainEventHandler {
    public static handle(state: MainStateInterface, event: appEvents.types): MainStateInterface {
        switch (event.type) {
            case appEvents.PROJECT_OPEN: {
                return {
                    ...state,
                    directory: event.payload,
                }
            }
            default: {
                return state;
            }
        }
    }
}
