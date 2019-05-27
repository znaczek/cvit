import {store} from '../index';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {UiActions} from '../store/actions/ui.actions';
import {AppEvents} from '../../common/events/app.events';
import {RenderActions} from '../store/actions/render.actions';

export class EditorEventHandler {
    public static handle(event: AppEvents.types) {
        const {dispatch} = store;
        switch (event.type) {
            case AppEvents.TYPES.CREATE_NEW: {
                return dispatch(ProjectActions.startCreateProject())
            }
            case AppEvents.TYPES.OPEN: {
                if (event.payload) {
                    return (<AppThunkDispatchType>dispatch)(ProjectActions.openProject(event.payload))
                }
                return;
            }
            case AppEvents.TYPES.SHOW_PRINT_CONFIG: {
                return dispatch(UiActions.openPrintConfigPopup());
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
            case AppEvents.TYPES.RENDER: {
                return (<AppThunkDispatchType>dispatch)(RenderActions.render())
            }
        }
    }
}
