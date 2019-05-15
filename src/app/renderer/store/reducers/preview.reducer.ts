import {ActionInterface} from '../../../common/interfaces/action.interface';
import {PreviewStateInterface} from '../../interfaces/state/preview-state.interface';
import {PreviewActions} from '../actions/preview.actions';

const initialDirectory = window.__APP_DOC_PREVIEW || null;

const initialState: PreviewStateInterface = {
    directory: initialDirectory,
    ts: new Date().getTime(),
    loader: false,
};

export default (state: PreviewStateInterface = initialState, action: ActionInterface<any>): PreviewStateInterface => {
    switch (action.type) {
        case PreviewActions.SET_DIRECTORY: {
            const directory = action.payload ? action.payload : state.directory;
            return {
                ...state,
                directory,
                ts: new Date().getTime(),
            }
        }
        case PreviewActions.SET_LOADER: {
            return {
                ...state,
                loader: true,
            }
        }
        case PreviewActions.CLEAR_LOADER: {
            return {
                ...state,
                loader: false,
            }
        }
        default:
            return state
    }
}
