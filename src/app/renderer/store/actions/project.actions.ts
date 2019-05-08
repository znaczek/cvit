import {ActionInterface} from '../../../common/interfaces/action.interface';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {StorageService} from '../../service/storage.service';
import {AppThunkActionType} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {OpenProjectInterface} from '../../interfaces/open-project.interface';
import {HtmlService} from '../../service/html.service';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectSelectors} from '../selectors/project.selectors';
import {APP_EVENT, CV_FILENAME, STYLES_FILENAME} from '../../../common/constants';
import {ipcRenderer} from "electron";
import {LocalStorage} from '../../service/local-storage.service';
import {AppEvents} from '../../../common/events/app.events';
import {ProjectService} from '../../service/project.service';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly START_CREATE_PROJECT = prefix + 'START_CREATE_PROJECT';

    public static readonly OPEN_PROJECT_SUCCESS = prefix + 'OPEN_PROJECT_SUCCESS';
    public static readonly OPEN_PROJECT_FAILURE = prefix + 'OPEN_PROJECT_FAILURE';

    public static readonly GET_CONTENT_SUCCESS = prefix + 'GET_CONTENT_SUCCESS';
    public static readonly GET_CONTENT_FAILURE = prefix + 'GET_CONTENT_FAILURE';

    public static readonly UPDATE_HTML = prefix + 'UPDATE_HTML';
    public static readonly UPDATE_STYLES = prefix + 'UPDATE_STYLES';
    public static readonly UPDATE_HEADER = prefix + 'UPDATE_HEADER';
    public static readonly UPDATE_FOOTER = prefix + 'UPDATE_FOOTER';

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
            } catch (e) {
                return dispatch(ProjectActions.openProjectFailure(e));
            }
        };
    }

    public static openProjectSuccess(directory: string): ActionInterface<string> {
        ipcRenderer.send(APP_EVENT, new AppEvents.ProjectOpen(directory));
        LocalStorage.set('lastDirectory', directory);
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
                const content = await StorageService.getFile(directory + '/' + CV_FILENAME);
                const html = HtmlService.getBody(content);
                const styles = await StorageService.getFile(directory + '/' + STYLES_FILENAME);
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

    public static updateHeader(styles: string): ActionInterface<string> {
        return {
            type: ProjectActions.UPDATE_HEADER,
            payload: styles,
        }
    }

    public static updateFooter(styles: string): ActionInterface<string> {
        return {
            type: ProjectActions.UPDATE_FOOTER,
            payload: styles,
        }
    }

    public static save(): AppThunkActionType<ActionInterface<CreateProjectInterface>> {
        return async (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            const state = getState();
            const directory = ProjectSelectors.getDirectory(state);
            const project = ProjectSelectors.getProjectState(state);
            try {
                await ProjectService.save(directory, project);
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
