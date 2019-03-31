import {Action} from 'redux';
import {ApplicationStateInterface} from '../interfaces/application-state.interface';
import {ThunkAction} from 'redux-thunk';
import {ActionInterface} from '../interfaces/action.interface';

export type AppThunkActionType<S extends Action = Action, T = Promise<S>, F = undefined> = ThunkAction<T, ApplicationStateInterface, F, S>;
