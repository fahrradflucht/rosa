import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import injectStoreAndGetRoutes from './routes';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = injectStoreAndGetRoutes(store);

render(
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>, document.getElementById('rosa_dashboard_container')
);