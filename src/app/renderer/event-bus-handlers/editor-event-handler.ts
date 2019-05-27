import {store} from '../index';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {UiActions} from '../store/actions/ui.actions';
import {AppEvents} from '../../common/events/app.events';
import {RenderActions} from '../store/actions/render.actions';

export class EditorEventHandler {
    public static handle(event: AppEvents.types): void {
        const {dispatch} = store;
        switch (event.type) {
            case AppEvents.TYPES.CREATE_NEW: {
                dispatch(ProjectActions.startCreateProject());
                break;
            }
            case AppEvents.TYPES.OPEN: {
                if (event.payload) {
                    (<AppThunkDispatchType>dispatch)(ProjectActions.openProject(event.payload));
                }
                break;
            }
            case AppEvents.TYPES.SHOW_PRINT_CONFIG: {
                dispatch(UiActions.openPrintConfigPopup());
                break;
            }
            case AppEvents.TYPES.SAVE: {
                (<AppThunkDispatchType>dispatch)(ProjectActions.save());
                break;
            }
            case AppEvents.TYPES.UNDO: {
                dispatch(UiActions.undo());
                break;
            }
            case AppEvents.TYPES.REDO: {
                dispatch(UiActions.redo());
                break;
            }
            case AppEvents.TYPES.RENDER: {
                (<AppThunkDispatchType>dispatch)(RenderActions.render());
                break;
            }
        }
    }
}
