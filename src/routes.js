import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Home, NoMatch } from './pages';

/* eslint-disable */
function Loading({ error }) {
  console.log("loading error", error)
  if (error) {
    return 'FUCK!';
  }

  return <h3>Loading...</h3>;
}

const About = Loadable({
  loader: () => import(/* webpackChunkName: "aboutPageChunk" */ './pages/About/About'),
  loading: Loading,
  modules: ['./pages/About/About']
});

const UserProfile = Loadable({
  loader: () => import(/* webpackChunkName: "userProfilePageChunk" */ './pages/UserProfile'),
  loading: Loading,
  modules: ['./pages/UserProfile']
});

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/users/:username" component={UserProfile} />
    <Route component={NoMatch} />
  </Switch>
);
