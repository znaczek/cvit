import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers/index';

const rootReducer = createRootReducer();
const enhancer = applyMiddleware(thunk);

function configureStore(initialState?: {}): Store {
    return createStore(rootReducer, initialState, enhancer);
}

export default {configureStore};
