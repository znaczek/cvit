import {ActionInterface} from '../../../common/interfaces/action.interface';
import {Template} from '../../models/template.model';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {StorageService} from '../../service/storage.service';
import {AppThunkActionType} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {history} from '../../history';
import {ROUTES} from '../../constants/route';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly START_CREATE_PROJECT = prefix + 'START_CREATE_PROJECT';

    public static readonly CREATE_PROJECT_SUCCESS = prefix + 'CREATE_PROJECT_SUCCESS';
    public static readonly CREATE_PROJECT_FAILURE = prefix + 'CREATE_PROJECT_FAILURE';

    public static startCreateProject(): ActionInterface {
        return {
            type: ProjectActions.START_CREATE_PROJECT,
        }
    }

    public static createProject(payload: CreateProjectInterface): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async function (dispatch: AppThunkDispatchType) {
            try {
                await StorageService.createProject(payload);
                history.push(ROUTES.EDITOR);

                return dispatch(ProjectActions.createProjectSuccess(payload.destination));
            } catch (e) {
                return dispatch(ProjectActions.createProjectFailure(e));
            }
        }
    }

    public static createProjectSuccess(directory: string): ActionInterface<string> {
        return {
            type: ProjectActions.CREATE_PROJECT_SUCCESS,
            payload: directory,
        }
    }

    public static createProjectFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.CREATE_PROJECT_FAILURE,
            payload: e,
        }
    }

}
