import {ActionInterface} from '../../../common/interfaces/action.interface';
import {AppThunkAsyncAction} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {delay} from '../../../common/tools/delay';

const prefix = '[PREVIEW] ';

export class PreviewActions {
    public static readonly SET_FILE = prefix + 'SET_FILE';
    public static readonly SET_LOADER = prefix + 'SET_LOADER';
    public static readonly CLEAR_LOADER = prefix + 'CLEAR_LOADER';

    public static refresh(directory?: string): AppThunkAsyncAction<string> {
        return async (dispatch: AppThunkDispatchType) => {
            dispatch(PreviewActions.setLoader());
            await delay(250);
            return dispatch(PreviewActions.setFile(directory));
        }
    }

    public static setLoader(): ActionInterface {
        return {
            type: PreviewActions.SET_LOADER,
        }
    }

    public static setFile(file: string): ActionInterface<string> {
        return {
            type: PreviewActions.SET_FILE,
            payload: file,
        }
    }

    public static refreshDone(): AppThunkAsyncAction<void> {
        return async (dispatch: AppThunkDispatchType) => {
            await delay(100);
            return dispatch(PreviewActions.clearLoader());
        }
    }

    public static clearLoader(): ActionInterface {
        return {
            type: PreviewActions.CLEAR_LOADER,
        }
    }

}
