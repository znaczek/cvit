import {Store} from 'redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';

export interface ConfigureStoreInterface {
    configureStore: (initialState?: Partial<ApplicationStateInterface>) => Store,
}
