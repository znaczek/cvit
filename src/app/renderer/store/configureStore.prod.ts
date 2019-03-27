import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers/index';
import {history} from '../history';

const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: {}): Store {
    return createStore(rootReducer, initialState, enhancer);
}

export default {configureStore};
