import {ActionInterface} from '../../../common/interfaces/action.interface';

const prefix = '[PREVIEW] ';

export class PreviewActions {
    public static readonly SET_FILE = prefix + 'SET_FILE';

    public static setFile(directory: string): ActionInterface<string> {
        return {
            type: PreviewActions.SET_FILE,
            payload: directory,
        }
    }

}
