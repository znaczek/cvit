import {Dispatch} from 'redux';
import {PATHS} from '../../paths';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {CV_FILE_NAME} from '../../../common/constants';
import {Template} from '../../models/template.model';
import {ROUTES} from '../../constants/route';
import {history} from '../configureStore';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly CREATE_PROJECT_SUCCESS = prefix + 'CREATE_PROJECT_SUCCESS';
    public static readonly CREATE_PROJECT_FAILURE = prefix + 'CREATE_PROJECT_FAILURE';

    public static createProject(templateName: string, directory: string) {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            console.log('some async project creation stuff :)', templateName, directory);
            history.push(ROUTES.EDITOR);
            dispatch(ProjectActions.createProjectSuccess());
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
