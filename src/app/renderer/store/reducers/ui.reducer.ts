import {ActionInterface} from '../../../common/interfaces/action.interface';
import {UiStateInterface} from '../../interfaces/state/ui-state.interface';
import {ProjectActions} from '../actions/project.actions';
import {UiActions} from '../actions/ui.actions';
import {RenderActions} from '../actions/render.actions';

const initialState: UiStateInterface = {
    newProjectPopupVisible: false,
    printConfigVisible: false,
    renderPopupVisible: false,
    undo: null,
    redo: null,
};

export default (state: UiStateInterface = initialState, action: ActionInterface<any>): UiStateInterface => {
    switch (action.type) {
        case ProjectActions.START_CREATE_PROJECT: {
            return {
                ...state,
                newProjectPopupVisible: true,
            }
        }
        case ProjectActions.OPEN_PROJECT_SUCCESS:
        case UiActions.CLOSE_CREATE_PROJECT_POPUP: {
            return {
                ...state,
                newProjectPopupVisible: false,
            }
        }
        case UiActions.OPEN_PRINT_CONFIG_POPUP: {
            return {
                ...state,
                printConfigVisible: true,
            }
        }
        case UiActions.CLOSE_PRINT_CONFIG_POPUP: {
            return {
                ...state,
                printConfigVisible: false,
            }
        }
        case UiActions.OPEN_RENDER_POPUP:
        case RenderActions.SUCCESS:
        case RenderActions.FAILURE: {
            return {
                ...state,
                renderPopupVisible: true,
            }
        }
        case UiActions.CLOSE_RENDER_POPUP: {
            return {
                ...state,
                renderPopupVisible: false,
            }
        }
        case UiActions.UNDO: {
            return {
                ...state,
                undo: new Date().getTime(),
            }
        }
        case UiActions.REDO: {
            return {
                ...state,
                redo: new Date().getTime(),
            }
        }
        default:
            return state;
    }
}
