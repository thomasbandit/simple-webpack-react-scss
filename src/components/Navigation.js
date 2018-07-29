import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class Navigation extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { menuExpanded: false };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      this.setState({ menuExpanded: false });
    }
  }

  handleButtonClick() {
    this.setState({ menuExpanded: !this.state.menuExpanded });
  }

  handleLinkClick() {
    this.setState({ menuExpanded: false });
  }

  render() {
    const { pathname } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.handleButtonClick}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={classNames('collapse navbar-collapse', { show: this.state.menuExpanded })}>
          <ul className="navbar-nav mr-auto">
            <li>
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
