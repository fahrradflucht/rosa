import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import shell from './shell';

export default combineReducers({
    routing: routerReducer,
    auth: auth,
    shell: shell
});