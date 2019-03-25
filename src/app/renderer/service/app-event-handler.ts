import * as appEvents from './../../common/events/app.events';
import {store} from '../index';
import {ProjectActions} from '../store/actions/project.actions';

export class AppEventHandler {
    public static handle(event: appEvents.types) {
        switch (event.type) {
            case appEvents.CREATE_NEW: {
                store.dispatch(ProjectActions.createProject())
            }
        }
    }
}
