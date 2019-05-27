import {ActionInterface} from '../../../common/interfaces/action.interface';
import {PrintConfigModel} from '../../models/print-config.model';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectSelectors} from '../selectors/project.selectors';
import {AppThunkAction} from '../../../common/types/app-thunk-action.type';
import {ipcRenderer} from "electron";
import {AppEvents} from '../../../common/events/app.events';
import {APP_EVENT} from '../../../common/constants';
import {PrintConfigService} from '../../../common/services/print-config.service';

const prefix = '[PRINT_CONFIG] ';

export class PrintConfigActions {
    public static readonly SET_CONFIG_SUCCESS = prefix + 'SET_CONFIG_SUCCESS';
    public static readonly SET_CONFIG_FAILURE = prefix + 'SET_CONFIG_FAILURE';

    public static saveConfig(payload: PrintConfigModel): AppThunkAction<PrintConfigModel> {
        return (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            try {
                const directory = ProjectSelectors.getDirectory(getState());
                PrintConfigService.savePrintConfig(directory, payload);
                ipcRenderer.send(APP_EVENT, new AppEvents.RefreshPreview(directory));
                return dispatch(PrintConfigActions.saveConfigSuccess(payload));
            } catch (e) {
                return dispatch(PrintConfigActions.saveConfigFailure(e));
            }
        };
    }

    public static saveConfigSuccess(payload: PrintConfigModel): ActionInterface<PrintConfigModel> {
        return {
            type: PrintConfigActions.SET_CONFIG_SUCCESS,
            payload,
        }
    }

    public static saveConfigFailure(e: any): ActionInterface<any> {
        return {
            type: PrintConfigActions.SET_CONFIG_FAILURE,
            payload: e,
        }
    }

}
