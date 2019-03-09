import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
import {ConfigureStoreInterface} from './configureStore.interface';

const selectedConfigureStore: ConfigureStoreInterface =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const configureStore = selectedConfigureStore.configureStore;
export const history = selectedConfigureStore.history;
