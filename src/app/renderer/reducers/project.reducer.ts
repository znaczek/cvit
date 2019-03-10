import {ProjectsStateInterface} from '../interfaces/projects-state.interface';
import {ActionInterface} from '../../common/interfaces/action.interface';
import {ProjectMetaModel} from '../models/project-meta.model';
import {CvModel} from '../models/cv.model';
import {ProjectActions} from '../actions/project.actions';

const initialState: ProjectsStateInterface = {
    meta: null,
    list: null,
};

export default (state: ProjectsStateInterface = initialState, action: ActionInterface<any>) => {
    switch (action.type) {
        case ProjectActions.CREATE_PROJECT: {
            console.log(new ProjectMetaModel());
            return {
                meta: new ProjectMetaModel(),
                list: [new CvModel()],
            }
        }
        default:
            return state
    }
}
