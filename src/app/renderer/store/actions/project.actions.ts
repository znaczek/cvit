import {ActionInterface} from '../../../common/interfaces/action.interface';
import {Template} from '../../models/template.model';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {StorageService} from '../../service/storage.service';
import {AppThunkActionType} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {history} from '../../history';
import {ROUTES} from '../../constants/route';
import {OpenProjectInterface} from '../../interfaces/open-project.interface';
import {Dispatch} from 'redux';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly START_CREATE_PROJECT = prefix + 'START_CREATE_PROJECT';

    public static readonly OPEN_PROJECT_SUCCESS = prefix + 'OPEN_PROJECT_SUCCESS';
    public static readonly OPEN_PROJECT_FAILURE = prefix + 'OPEN_PROJECT_FAILURE';

    public static readonly GET_CONTENT_SUCCESS = prefix + 'GET_CONTENT_SUCCESS';
    public static readonly GET_CONTENT_FAILURE = prefix + 'GET_CONTENT_FAILURE';

    public static startCreateProject(): ActionInterface {
        return {
            type: ProjectActions.START_CREATE_PROJECT,
        }
    }

    public static createProject(payload: CreateProjectInterface): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                await StorageService.createProject(payload);
                const dispatchResult = dispatch(ProjectActions.openProjectSuccess(payload.destination));
                history.push(ROUTES.EDITOR);
                return dispatchResult;
            } catch (e) {
                return dispatch(ProjectActions.openProjectFailure(e));
            }
        }
    }

    public static openProject(payload: OpenProjectInterface): AppThunkActionType<ActionInterface<OpenProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                const dispatchResult = dispatch(ProjectActions.openProjectSuccess(payload.destination));
                history.push(ROUTES.EDITOR);
                return dispatchResult;
            } catch (e) {
                return dispatch(ProjectActions.openProjectFailure(e));
            }
        };
    }

    public static openProjectSuccess(directory: string): ActionInterface<string> {
        return {
            type: ProjectActions.OPEN_PROJECT_SUCCESS,
            payload: directory,
        }
    }

    public static openProjectFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.OPEN_PROJECT_FAILURE,
            payload: e,
        }
    }

    public static getContent(file: string): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                const content = await StorageService.getContent(file);
                return dispatch(ProjectActions.getContentSuccess(content));
            } catch (e) {
                return dispatch(ProjectActions.getContentFailure(e));
            }
        }
    }

    public static getContentSuccess(content: string): ActionInterface<string> {
        return {
            type: ProjectActions.GET_CONTENT_SUCCESS,
            payload: content,
        }
    }

    public static getContentFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.GET_CONTENT_FAILURE,
            payload: e,
        }
    }

}
