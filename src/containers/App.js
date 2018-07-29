import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Routes from '../routes';
import { Navigation } from '../components';
import styles from '../assets/scss/main.scss';

const AppContainer = ({ pathname }) => (
  <div>
    <Navigation pathname={pathname} />
    <Routes />
  </div>
);

AppContainer.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(AppContainer);
