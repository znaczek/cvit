import {ActionInterface} from '../../../common/interfaces/action.interface';
import {UiStateInterface} from '../../interfaces/state/UiStateInterface';
import {ProjectActions} from '../actions/project.actions';
import {UiActions} from '../actions/UiActions';

const initialState: UiStateInterface = {
    newProjectPopupVisible: false,
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
        default:
            return state;
    }
}
