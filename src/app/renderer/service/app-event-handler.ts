import * as appEvents from './../../common/events/app.events';
import {store} from '../index';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';

export class AppEventHandler {
    public static handle(event: appEvents.types) {
        const {dispatch} = store;
        switch (event.type) {
            case appEvents.CREATE_NEW: {
                return dispatch(ProjectActions.startCreateProject())
            }
            case appEvents.OPEN: {
                return (<AppThunkDispatchType>dispatch)(ProjectActions.openProject({
                    destination: event.payload
                }))
            }
        }
    }
}
