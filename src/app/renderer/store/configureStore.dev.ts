import {applyMiddleware, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {routerActions, routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers';
import {history} from '../history';

const rootReducer = createRootReducer(history);

const configureStore = (initialState?: {}): Store => {
    const middleware = [];

    middleware.push(thunk);

    const router = routerMiddleware(history);
    middleware.push(router);

    const actionCreators = {
        ...routerActions
    };

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            actionCreators
        })
        : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middleware));

    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept(
            './reducers',
            () => store.replaceReducer(require('./reducers/index').default)
        );
    }

    return store;
};

export default {configureStore};
