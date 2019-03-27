import {Action} from 'redux';

export interface ActionInterface<T = undefined> extends Action<string> {
    payload?: T;
}
