import {ActionInterface} from '../../../common/interfaces/action.interface';
import {AppThunkAsyncAction} from '../../../common/types/app-thunk-action.type';
import {AppThunkDispatchType} from '../../../common/types/app-thunk-dispatch.type';
import {delay} from '../../../common/tools/delay';
import {StatusEnum} from '../../../common/enums/status.enum';
import {PdfRenderer} from '../../../main/service/pdf-renderer';
import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {UiActions} from './ui.actions';
import {PrintConfigSelectors} from '../selectors/print-config.selectors';
import {ProjectSelectors} from '../selectors/project.selectors';

const prefix = '[RENDER] ';

export class RenderActions {
    public static readonly START = prefix + 'START';
    public static readonly SUCCESS = prefix + 'SUCCESS';
    public static readonly FAILURE = prefix + 'FAILURE';

    public static render(): AppThunkAsyncAction<void | string> {
        return async (dispatch: AppThunkDispatchType, getState: () => ApplicationStateInterface) => {
            try {
                const state = getState();
                dispatch(UiActions.openRenderPopup());
                dispatch(RenderActions.start());
                await PdfRenderer.render(
                    ProjectSelectors.getDirectory(state),
                    PrintConfigSelectors.getConfig(state),
                );
                return dispatch(RenderActions.success());
            } catch (e) {
                return dispatch(RenderActions.failure(e));
            }
        };
    }

    public static start(): ActionInterface {
        return {
            type: RenderActions.START,
        }
    }

    public static success(): ActionInterface {
        return {
            type: RenderActions.SUCCESS,
        }
    }

    public static failure(message: string): ActionInterface<string> {
        return {
            type: RenderActions.FAILURE,
            payload: message,
        }
    }

}
