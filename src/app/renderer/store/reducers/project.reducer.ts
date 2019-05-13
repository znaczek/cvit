import {ProjectStateInterface} from '../../interfaces/state/projects-state.interface';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {ProjectActions} from '../actions/project.actions';

const initialState: ProjectStateInterface = {
    directory: '',
    html: '',
    styles: '',
    header: '',
    footer: '',
};

export default (state: ProjectStateInterface = initialState, action: ActionInterface<any>): ProjectStateInterface => {
    switch (action.type) {
        case ProjectActions.OPEN_PROJECT_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ProjectActions.UPDATE_HTML: {
            return {
                ...state,
                html: action.payload,
            }
        }
        case ProjectActions.UPDATE_STYLES: {
            return {
                ...state,
                styles: action.payload,
            }
        }
        case ProjectActions.UPDATE_HEADER: {
            return {
                ...state,
                header: action.payload,
            }
        }
        case ProjectActions.UPDATE_FOOTER: {
            return {
                ...state,
                footer: action.payload,
            }
        }
        default:
            return state
    }
}
