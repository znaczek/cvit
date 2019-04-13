import * as React from 'react';
import {ipcRenderer} from 'electron';
import {APP_EVENT} from '../common/constants';
import {AppEventHandler} from './service/app-event-handler';
import {connect} from 'react-redux';
import {Action, Dispatch} from 'redux';
import {AppEvents} from '../common/events/app.events';

interface Props {
    children: React.ReactNodeArray;
    dispatch: Dispatch<Action>;
}

export class App extends React.Component<Props> {
    props: Props;

    public componentDidMount() {
        const root = window.document.getElementById('root');
        root.style.height = '100vh';
        ipcRenderer.on(APP_EVENT, (e: any, action: AppEvents.types) => AppEventHandler.handle(action));
    }

    render() {
        const {children} = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}

export default connect()(App);
