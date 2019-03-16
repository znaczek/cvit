import {ActionInterface} from '../../../common/interfaces/action.interface';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';

const initialState: TemplatesStateInterface = {
    list: null,
};

export default (state: TemplatesStateInterface = initialState, action: ActionInterface<any>): TemplatesStateInterface => {
    switch (action.type) {
        default:
            return state;
    }
}
