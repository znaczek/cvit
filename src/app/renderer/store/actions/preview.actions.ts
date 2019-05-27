import {ActionInterface} from '../../../common/interfaces/action.interface';
import {AppThunkAsyncAction} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {delay} from '../../../common/utils/delay';

const prefix = '[PREVIEW] ';

export class PreviewActions {
    public static readonly SET_DIRECTORY = prefix + 'SET_DIRECTORY';
    public static readonly SET_LOADER = prefix + 'SET_LOADER';
    public static readonly CLEAR_LOADER = prefix + 'CLEAR_LOADER';

    private static debounceTimeout: number;

    public static refreshDebounced(directory?: string): AppThunkAsyncAction<any, void> {
        return async (dispatch: AppThunkDispatchType) => {
            clearTimeout(PreviewActions.debounceTimeout);
            PreviewActions.debounceTimeout = setTimeout(() => {
                dispatch(PreviewActions.refresh(directory));
            }, 100);
        }
    }

    private static refresh(directory?: string): AppThunkAsyncAction<string> {
        return async (dispatch: AppThunkDispatchType) => {
            dispatch(PreviewActions.setLoader());
            await delay(250);
            return dispatch(PreviewActions.setDirectory(directory));
        }
    }

    public static setLoader(): ActionInterface {
        return {
            type: PreviewActions.SET_LOADER,
        }
    }

    public static setDirectory(file: string): ActionInterface<string> {
        return {
            type: PreviewActions.SET_DIRECTORY,
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
