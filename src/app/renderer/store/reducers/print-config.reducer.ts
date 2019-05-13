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
        case PrintConfigActions.SET_CONFIG_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }
}
