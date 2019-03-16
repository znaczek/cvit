import {ProjectsStateInterface} from '../../interfaces/state/projects-state.interface';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {ProjectActions} from '../actions/project.actions';
import {ProjectModel} from '../../models/project.model';

const initialState: ProjectsStateInterface = {
    entity: null,
};

export default (state: ProjectsStateInterface = initialState, action: ActionInterface<any>): ProjectsStateInterface => {
    switch (action.type) {
        case ProjectActions.CREATE_PROJECT_SUCCESS: {
            return {
                ...state,
                entity: new ProjectModel(),
            }
        }
        default:
            return state
    }
}
