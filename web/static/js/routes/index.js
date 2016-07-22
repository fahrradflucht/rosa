import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Shell from '../components/shell';
import Dashboard from '../components/dashboard';

export default (store) => {
    // onEnter hooks here

    return (
        <Route component={Shell} path="/admin">
            <IndexRoute component={Dashboard}/>
        </Route>
    )
}