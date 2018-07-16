import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContainer>
            <App />
          </AppContainer>
        </ConnectedRouter>
      </Provider>,
      el,
    );
  };

  render(App);
  
  // webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      render(App);

      // in all other cases - re-require App manually
      render(require('./containers/App'));
    });
  }
}
