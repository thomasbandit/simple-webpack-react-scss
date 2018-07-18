import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Home, NoMatch } from '../pages';
import { Navigation } from '../components';
import styles from '../assets/scss/main.scss';

/* eslint-disable */
function Loading({ error }) {
  if (error) {
    return 'Oh nooess!';
  }

  return <h3>Loading...</h3>;
}

const About = Loadable({
  loader: () => import('../pages/About'),
  loading: Loading,
});

const UserProfile = Loadable({
  loader: () => import('../pages/UserProfile'),
  loading: Loading,
});

const AppContainer = ({ pathname }) => (
  <div>
    <Navigation pathname={pathname} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/users/:username" component={UserProfile} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

AppContainer.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(AppContainer);
