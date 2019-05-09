import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {PrintConfigActions} from '../actions/print-config.actions';

const initialState: PrintConfigStateInterface = {
    hasHeader: false,
    hasFooter: false,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
};

export default (state: PrintConfigStateInterface = initialState, action: ActionInterface<any>): PrintConfigStateInterface => {
    switch (action.type) {
        case PrintConfigActions.SET_HAS_HEADER: {
            return {
                ...state,
                hasHeader: action.payload,
            }
        }
        case PrintConfigActions.SET_HAS_FOOTER: {
            return {
                ...state,
                hasFooter: action.payload,
            }
        }
        case PrintConfigActions.SET_MARGIN_TOP: {
            return {
                ...state,
                marginTop: action.payload,
            }
        }
        case PrintConfigActions.SET_MARGIN_BOTTOM: {
            return {
                ...state,
                marginBottom: action.payload,
            }
        }
        case PrintConfigActions.SET_MARGIN_LEFT: {
            return {
                ...state,
                marginLeft: action.payload,
            }
        }
        case PrintConfigActions.SET_MARGIN_RIGHT: {
            return {
                ...state,
                marginRight: action.payload,
            }
        }
        default:
            return state
    }
}
