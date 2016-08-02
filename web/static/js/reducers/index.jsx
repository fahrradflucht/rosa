import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import shell from './shell';

export default combineReducers({
  routing: routerReducer,
  session,
  shell,
});
