import {applyMiddleware, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

const rootReducer = createRootReducer();

const configureStore = (initialState?: {}): Store => {
    const middleware = [];

    middleware.push(thunk);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
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
