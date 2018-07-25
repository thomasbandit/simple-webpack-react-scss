import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import configureStore from './redux/configureStore';
import App from './containers/App';

const el = document.getElementById('app');
// const history = createBrowserHistory();
const { store, history } = configureStore();

/* eslint-disable */
if (el) {

  // Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
  // Let's also let React Frontload explicitly know we're not rendering on the server here
  const Application = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Frontload noServerRender>
          <App />
        </Frontload>
      </ConnectedRouter>
    </Provider>
  );

  if (process.env.NODE_ENV === 'production') {
    // If we're running in production, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
      hydrate(Application, el);
    });
  } else {
    // If we're not running on the server, just render like normal
    render(Application, el);
  }


  // const render = Component => {
  //   ReactDOM.render(
  //     <Provider store={store}>
  //       <ConnectedRouter history={history}>
  //         <AppContainer>
  //           <App />
  //         </AppContainer>
  //       </ConnectedRouter>
  //     </Provider>,
  //     el,
  //   );
  // };

  // render(App);

  // // webpack Hot Module Replacement API
  // if (module.hot) {
  //   module.hot.accept('./containers/App', () => {
  //     render(App);

  //     // in all other cases - re-require App manually
  //     render(require('./containers/App'));
  //   });
  // }
}
