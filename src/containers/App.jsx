import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import {
  About,
  Home,
  NoMatch,
  UserProfile,
} from '../pages';
import { Navigation } from '../components';
import styles from '../assets/scss/main.scss';

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
