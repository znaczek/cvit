import {ActionInterface} from '../../../common/interfaces/action.interface';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {StorageService} from '../../service/storage.service';
import {AppThunkAction} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {OpenProjectInterface} from '../../interfaces/open-project.interface';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectSelectors} from '../selectors/project.selectors';
import {APP_EVENT} from '../../../common/constants';
import {ipcRenderer} from "electron";
import {LocalStorage} from '../../service/local-storage.service';
import {AppEvents} from '../../../common/events/app.events';
import {ProjectService} from '../../service/project.service';
import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';
import {ProjectModel} from '../../models/project.model';
import {ProjectStateModel} from '../../models/project-state.model';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly START_CREATE_PROJECT = prefix + 'START_CREATE_PROJECT';

    public static readonly CREATE_PROJECT_SUCCESS = prefix + 'CREATE_PROJECT_SUCCESS';
    public static readonly CREATE_PROJECT_FAILURE = prefix + 'CREATE_PROJECT_FAILURE';

    public static readonly OPEN_PROJECT_SUCCESS = prefix + 'OPEN_PROJECT_SUCCESS';
    public static readonly OPEN_PROJECT_FAILURE = prefix + 'OPEN_PROJECT_FAILURE';

    public static readonly SET_PRINT_CONFIG = prefix + 'SET_PRINT_CONFIG';

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

    public static createProject(payload: CreateProjectInterface): AppThunkAction<OpenProjectInterface> {
        return (dispatch: AppThunkDispatchType) => {
            try {
                StorageService.createProject(payload);
            } catch (e) {
                return dispatch(ProjectActions.createProjectFailure(e));
            }
            dispatch(ProjectActions.createProjectSuccess());
            return dispatch(ProjectActions.openProject(payload.directory));
        }
    }

    public static createProjectSuccess(): ActionInterface {
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

    public static openProject(directory: string): AppThunkAction<OpenProjectInterface> {
        return (dispatch: AppThunkDispatchType) => {
            try {
                const project = ProjectService.getProject(directory);
                const printConfig = ProjectService.getPrintConfig(directory);
                dispatch(ProjectActions.setPrintConfig(printConfig));
                return dispatch(ProjectActions.openProjectSuccess(new ProjectStateModel({
                    directory,
                ...project,
                })));
            } catch (e) {
                return dispatch(ProjectActions.openProjectFailure(e));
            }
        };
    }

    public static openProjectSuccess(payload: OpenProjectInterface): ActionInterface<OpenProjectInterface> {
        ipcRenderer.send(APP_EVENT, new AppEvents.ProjectOpen(payload.directory));
        LocalStorage.set('lastDirectory', payload.directory);
        return {
            type: ProjectActions.OPEN_PROJECT_SUCCESS,
            payload,
        }
    }

    public static openProjectFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.OPEN_PROJECT_FAILURE,
            payload: e,
        }
    }

    public static setPrintConfig(payload: PrintConfigStateInterface): ActionInterface<PrintConfigStateInterface> {
        return {
            type: ProjectActions.SET_PRINT_CONFIG,
            payload,
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

    public static save(): AppThunkAction<CreateProjectInterface> {
        return (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            const state = getState();
            const directory = ProjectSelectors.getDirectory(state);
            const project = ProjectSelectors.getProjectState(state);
            try {
                ProjectService.save(directory, project);
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
