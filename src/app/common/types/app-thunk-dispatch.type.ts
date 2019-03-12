import {Action} from 'redux';
import {ApplicationStateInterface} from '../interfaces/application-state.interface';
import {ThunkDispatch} from 'redux-thunk';

export type AppThunkDispatchType<T = undefined> = ThunkDispatch<ApplicationStateInterface, T, Action>