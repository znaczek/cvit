import {store} from '../index';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {UiActions} from '../store/actions/UiActions';
import {AppEvents} from '../../common/events/app.events';

export class EditorEventHandler {
    public static handle(event: AppEvents.types) {
        console.log('lol');
        const {dispatch} = store;
        switch (event.type) {
            case AppEvents.TYPES.CREATE_NEW: {
                return dispatch(ProjectActions.startCreateProject())
            }
            case AppEvents.TYPES.OPEN: {
                if (event.payload) {
                    return (<AppThunkDispatchType>dispatch)(ProjectActions.openProject({
                        destination: event.payload
                    }))
                }
                return;
            }
            case AppEvents.TYPES.SAVE: {
                return (<AppThunkDispatchType>dispatch)(ProjectActions.save())
            }
            case AppEvents.TYPES.UNDO: {
                return dispatch(UiActions.undo())
            }
            case AppEvents.TYPES.REDO: {
                return dispatch(UiActions.redo())
            }
        }
    }
}
