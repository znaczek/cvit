import * as React from 'react';
import {Route, Switch} from 'react-router';
import routes from './constants/route';
import App from './App';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
