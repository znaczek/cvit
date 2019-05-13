import {ActionInterface} from '../../../common/interfaces/action.interface';
import {PrintConfigModel} from '../../models/print-config.model';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {ProjectService} from '../../service/project.service';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectSelectors} from '../selectors/project.selectors';
import {AppThunkAction} from '../../../common/types/app-thunk-action.type';

const prefix = '[PRINT_CONFIG] ';

export class PrintConfigActions {
    public static readonly SET_CONFIG_SUCCESS = prefix + 'SET_CONFIG_SUCCESS';
    public static readonly SET_CONFIG_FAILURE = prefix + 'SET_CONFIG_FAILURE';

    public static saveConfig(payload: PrintConfigModel): AppThunkAction<PrintConfigModel> {
        return (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            try {
                ProjectService.savePrintConfig(ProjectSelectors.getDirectory(getState()), payload);
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
