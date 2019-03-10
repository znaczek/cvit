import * as React from 'react';
import {ipcRenderer} from 'electron';
import {APP_EVENT} from '../common/constants';
import {AppEventHandler} from './service/app-event-handler';
import * as appEvents from './../common/events/app.events';
import {connect} from 'react-redux';
import {Action, Dispatch} from 'redux';

interface Props {
    children: React.ReactNode;
    dispatch: Dispatch<Action>;
}

export class App extends React.Component<Props> {
    props: Props;

    public componentDidMount() {
        ipcRenderer.on(APP_EVENT, (e: any, action: appEvents.types) => AppEventHandler.handle(action, this.props.dispatch));
    }

    render() {
        const {children} = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}

export default connect()(App);
