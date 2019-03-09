import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import Routes from './Routes';
import {Store} from 'redux';
import {History} from 'history';

type Props = {
    store: Store,
    history: History,
};

export default class Root extends React.Component<Props> {
    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes/>
                </ConnectedRouter>
            </Provider>
        );
    }
}
