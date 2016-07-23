import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShellContainer from '../containers/shellContainer';
import Dashboard from '../components/dashboard';

export default (store) => {
    // onEnter hooks here

    return (
        <Route component={ShellContainer} path="/admin">
            <IndexRoute component={Dashboard}/>
        </Route>
    )
}