import {ActionInterface} from '../../../common/interfaces/action.interface';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {StorageService} from '../../service/storage.service';
import {AppThunkActionType} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {history} from '../../history';
import {ROUTES} from '../../constants/route';
import {OpenProjectInterface} from '../../interfaces/open-project.interface';
import {ProjectService} from '../../service/project-service';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectSelectors} from '../selectors/project.selectors';
import {CV_FILE_NAME} from '../../../common/constants';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly START_CREATE_PROJECT = prefix + 'START_CREATE_PROJECT';

    public static readonly OPEN_PROJECT_SUCCESS = prefix + 'OPEN_PROJECT_SUCCESS';
    public static readonly OPEN_PROJECT_FAILURE = prefix + 'OPEN_PROJECT_FAILURE';

    public static readonly GET_CONTENT_SUCCESS = prefix + 'GET_CONTENT_SUCCESS';
    public static readonly GET_CONTENT_FAILURE = prefix + 'GET_CONTENT_FAILURE';

    public static readonly UPDATE_HTML = prefix + 'UPDATE_HTML';
    public static readonly UPDATE_STYLES = prefix + 'UPDATE_STYLES';

    public static readonly SAVE = prefix + 'SAVE';
    public static readonly SAVE_SUCCESS = prefix + 'SAVE_SUCCESS';
    public static readonly SAVE_FAILURE = prefix + 'SAVE_FAILURE';

    public static startCreateProject(): ActionInterface {
        return {
            type: ProjectActions.START_CREATE_PROJECT,
        }
    }

    public static createProject(payload: CreateProjectInterface): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                await StorageService.createProject(payload);
                await dispatch(ProjectActions.getContent(payload.destination));
                dispatch(ProjectActions.openProjectSuccess(payload.destination));
                history.push(ROUTES.EDITOR);
            } catch (e) {
                return dispatch(ProjectActions.openProjectFailure(e));
            }
        }
    }

    public static openProject(payload: OpenProjectInterface): AppThunkActionType<ActionInterface<OpenProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                await dispatch(ProjectActions.getContent(payload.destination));
                dispatch(ProjectActions.openProjectSuccess(payload.destination));
                history.push(ROUTES.EDITOR);
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

    public static getContent(directory: string): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType) => {
            try {
                const content = await StorageService.getContent(directory + '/' + CV_FILE_NAME);
                const html = ProjectService.getHTML(content);
                const styles = ProjectService.getStyles(content);
                dispatch(ProjectActions.updateHtml(html));
                dispatch(ProjectActions.updateStyles(styles));
                return dispatch(ProjectActions.getContentSuccess());
            } catch (e) {
                return dispatch(ProjectActions.getContentFailure(e));
            }
        }
    }

    public static getContentSuccess():  ActionInterface {
        return {
            type: ProjectActions.GET_CONTENT_SUCCESS,
        }
    }

    public static getContentFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.GET_CONTENT_FAILURE,
            payload: e,
        }
    }

    public static updateHtml(html: string): ActionInterface<string> {
        return {
            type: ProjectActions.UPDATE_HTML,
            payload: html,
        }
    }

    public static updateStyles(styles: string): ActionInterface<string> {
        return {
            type: ProjectActions.UPDATE_STYLES,
            payload: styles,
        }
    }

    public static save(): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            const state = getState();
            const project = ProjectSelectors.getProject(state);
            const directory = ProjectSelectors.getDirectory(state);
            try {
                await StorageService.save(directory + '/' + CV_FILE_NAME, project);
                return dispatch(ProjectActions.saveSuccess());
            } catch (e) {
                return dispatch(ProjectActions.saveFailure(e));
            }
        }
    }

    public static saveSuccess(): ActionInterface {
        return {
            type: ProjectActions.SAVE_SUCCESS,
        }
    }

    public static saveFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.SAVE_FAILURE,
            payload: e,
        }
    }

}
