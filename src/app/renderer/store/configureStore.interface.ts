import {Store} from 'redux';
import {History} from 'History';

export interface ConfigureStoreInterface {
    configureStore: (initialState?: any) => Store,
    history: History,
}