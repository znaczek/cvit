import * as appEvents from './../../common/events/app.events';
import {history} from '../store/configureStore';
import {ROUTES} from '../constants/route';
import {Action, Dispatch} from 'redux';
import {ProjectActions} from '../store/actions/project.actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';

export class AppEventHandler {
    public static handle(event: appEvents.types, dispatch: AppThunkDispatchType) {
        switch (event.type) {
            case appEvents.CREATE_NEW: {
                dispatch(ProjectActions.createProject());
                history.push(ROUTES.PROJECT);
            }
        }
    }
}