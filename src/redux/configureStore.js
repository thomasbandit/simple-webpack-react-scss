import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import reducer from './reducer';

let composeEnhancers = compose;
let middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
  middleware = [...middleware, logger];
}

const configureStore = (history) => {
  const router = routerMiddleware(history);
  middleware = [...middleware, router];

  const store = createStore(
    connectRouter(history)(reducer),
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
};

export default configureStore;
