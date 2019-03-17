import * as React from 'react';
import {Route, Switch} from 'react-router';
import {ROUTES} from './constants/route';
import App from './App';
import HomePage from './containers/HomePage';
import ProjectPage from './containers/ProjectPage';
import {EditorPage} from './containers/EditorPage';

export default () => (
    <App>
        <Switch>
            <Route path={ROUTES.PROJECT} component={ProjectPage}/>
            <Route path={ROUTES.HOME} component={HomePage} exact/>
            <Route path={ROUTES.EDITOR} component={EditorPage} exact/>
        </Switch>
    </App>
);
