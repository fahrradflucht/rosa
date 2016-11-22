import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default function configureStore(browserHistory) {
  const createStoreWithMiddleware = applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware,
    )(createStore);

  return createStoreWithMiddleware(reducer,
  global.window.devToolsExtension && global.window.devToolsExtension());
}
