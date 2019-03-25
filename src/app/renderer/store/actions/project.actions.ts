import {ActionInterface} from '../../../common/interfaces/action.interface';
import {Template} from '../../models/template.model';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly CREATE_PROJECT = prefix + 'CREATE_PROJECT';
    public static readonly CREATE_PROJECT_SUCCESS = prefix + 'CREATE_PROJECT_SUCCESS';
    public static readonly CREATE_PROJECT_FAILURE = prefix + 'CREATE_PROJECT_FAILURE';

    public static createProject() {
        // return async (dispatch: Dispatch<any>): Promise<void> => {
        //     history.push(ROUTES.EDITOR);
        //     dispatch(ProjectActions.createProjectSuccess());
        // }
        return {
            type: ProjectActions.CREATE_PROJECT,
        }
    }

    public static createProjectSuccess(): ActionInterface<Template[]> {
        return {
            type: ProjectActions.CREATE_PROJECT_SUCCESS,
        }
    }

    public static createProjectFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.CREATE_PROJECT_FAILURE,
            payload: e,
        }
    }

}
