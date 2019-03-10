import * as appEvents from './../../common/events/app.events';
import {history} from '../store/configureStore';
import {ROUTES} from '../constants/route';
import {Action, Dispatch} from 'redux';
import {ProjectActions} from '../actions/project.actions';

export class AppEventHandler {
    public static handle(event: appEvents.types, dispatch: Dispatch<Action>) {
        switch (event.type) {
            case appEvents.CREATE_NEW: {
                dispatch(ProjectActions.createProject());
                history.push(ROUTES.PROJECT);
            }
        }
    }
}