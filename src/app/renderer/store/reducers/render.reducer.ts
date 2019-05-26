import {ActionInterface} from '../../../common/interfaces/action.interface';
import {RenderStateInterface} from '../../interfaces/state/render-state.interface';
import {StatusEnum} from '../../../common/enums/status.enum';
import {RenderActions} from '../actions/render.actions';

const initialState: RenderStateInterface = {
    message: null,
    status: null
};

export default (state: RenderStateInterface = initialState, action: ActionInterface<any>): RenderStateInterface => {
    switch (action.type) {
        case RenderActions.START: {
            return {
                ...state,
                status: StatusEnum.PENDING,
                message: null,
            }
        }
        case RenderActions.SUCCESS: {
            return {
                ...state,
                status: StatusEnum.SUCCESS
            }
        }
        case RenderActions.FAILURE: {
            return {
                ...state,
                status: StatusEnum.FAILURE,
                message: action.payload,
            }
        }
        default:
            return state
    }
}
