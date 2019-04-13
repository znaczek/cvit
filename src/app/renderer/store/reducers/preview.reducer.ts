import {ActionInterface} from '../../../common/interfaces/action.interface';
import {PreviewStateInterface} from '../../interfaces/state/preview-state.interface';
import {PreviewActions} from '../actions/preview.actions';

const initialState: PreviewStateInterface = {
    directory: window.__APP_DOC_PREVIEW || null,
};

export default (state: PreviewStateInterface = initialState, action: ActionInterface<any>): PreviewStateInterface => {
    switch (action.type) {
        case PreviewActions.SET_FILE: {
            return {
                ...state,
                directory: action.payload,
            }
        }
        default:
            return state
    }
}
