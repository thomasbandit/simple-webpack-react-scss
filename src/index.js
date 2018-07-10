import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './redux/configureStore';
import App from './containers/App';

const el = document.getElementById('app');
const history = createBrowserHistory();
const store = configureStore(history);

/* eslint-disable */
if (el) {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    el,
  );
}
