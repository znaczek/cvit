import {ProjectsStateInterface} from '../../interfaces/state/projects-state.interface';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {ProjectActions} from '../actions/project.actions';

const initialState: ProjectsStateInterface = {
    directory: null,
    content: null,
};

export default (state: ProjectsStateInterface = initialState, action: ActionInterface<any>): ProjectsStateInterface => {
    switch (action.type) {
        case ProjectActions.OPEN_PROJECT_SUCCESS: {
            return {
                ...state,
                directory: action.payload,
            }
        }
        case ProjectActions.GET_CONTENT_SUCCESS: {
            return {
                ...state,
                content: action.payload,
            }
        }
        default:
            return state
    }
}
