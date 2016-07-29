import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as Cookies from 'js-cookie';
import ShellContainer from '../containers/ShellContainer';
import Dashboard from '../components/Dashboard';
import LoginContainer from '../containers/LoginContainer';
import { rehydrateSession } from '../actions/session';

export default (store) => {
  const authenticate = (next, replace) => {
    const { dispatch } = store;
    const { user } = store.getState().session;

    if (!user) {
      const jwt = Cookies.get('RosaJWT');
      if (jwt) {
        dispatch(rehydrateSession());
      } else {
        replace('/admin/login');
      }
    }
  };


  return (
    <Route path="/admin">
      <Route component={ShellContainer} onEnter={authenticate}>
        <IndexRoute component={Dashboard} />
      </Route>
      <Route component={LoginContainer} path="login" />
    </Route>
  );
};
