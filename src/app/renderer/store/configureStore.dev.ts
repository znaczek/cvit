import {applyMiddleware, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {createHashHistory} from 'history';
import {routerActions, routerMiddleware} from 'connected-react-router';
import {createLogger} from 'redux-logger';
import createRootReducer from './reducers';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configureStore = (initialState?: {}): Store => {
    const middleware = [];

    middleware.push(thunk);

    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

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

export default {configureStore, history};
