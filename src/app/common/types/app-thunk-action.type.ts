import {ApplicationStateInterface} from '../interfaces/application-state.interface';
import {ThunkAction} from 'redux-thunk';
import {ActionInterface} from '../interfaces/action.interface';

export type AppThunkAction<S = undefined,
    T = ActionInterface<S>,
    F = undefined>
    = ThunkAction<T, ApplicationStateInterface, F, ActionInterface<S>>;

export type AppThunkAsyncAction<S = undefined,
    T = Promise<ActionInterface<S>>,
    F = undefined>
    = ThunkAction<T, ApplicationStateInterface, F, ActionInterface<S>>;
