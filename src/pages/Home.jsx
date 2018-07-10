import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUsers } from '../redux/actions/users';
import { ErrorMessage, Preloader } from '../components';

class Home extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      avatar_url: PropTypes.string,
      events_url: PropTypes.string,
      followers_url: PropTypes.string,
      following_url: PropTypes.string,
      gists_url: PropTypes.string,
      gravatar_id: PropTypes.string,
      html_url: PropTypes.string,
      id: PropTypes.number,
      login: PropTypes.string,
      node_id: PropTypes.string,
      organizations_url: PropTypes.string,
      received_events_url: PropTypes.string,
      repos_url: PropTypes.string,
      site_admin: PropTypes.bool,
      starred_url: PropTypes.string,
      subscriptions_url: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  };

  constructor(props) {
    super(props);

    this.buildUserComponent = this.buildUserComponent.bind(this);
    this.handleLoadMoreBtnClick = this.handleLoadMoreBtnClick.bind(this);
  }

  componentDidMount() {
    const {
      loadUsers,
      users,
    } = this.props;

    if (!users.length) {
      loadUsers();
    }
  }

  handleLoadMoreBtnClick() {
    const { loadUsers } = this.props;

    loadUsers();
  }

  buildUserComponent(user) {
    return (
      <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>
          {user.avatar_url.length ?
            <img
              src={user.avatar_url}
              className="user-thumbnail img-thumbnail"
              alt={user.login}
              style={{ maxWidth: 100, height: 'auto' }}
            />
            : ''
          }
        </td>
        <td className="align-middle">
          {user.login}
        </td>
        <td className="align-middle">
          <Link to={`users/${user.login}`} className="btn btn-info">More</Link>
        </td>
      </tr>
    );
  }

  render() {
    const {
      error,
      loading,
      users,
    } = this.props;

    if (!loading && error) {
      return <ErrorMessage />;
    }

    const userComponents = users.map(this.buildUserComponent);

    return (
      <div className="container-fluid mt-4 mb-5">
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <h3 className="mb-3">Users</h3>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">User</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {userComponents}
                </tbody>
              </table>
            </div>

            {loading &&
              <div className="row mt-4 mb-3">
                <Preloader />
              </div>
            }

            <div className="text-center">
              <button
                type="button"
                className="btn btn-light"
                disabled={loading}
                onClick={this.handleLoadMoreBtnClick}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.error,
  loading: state.users.loading,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
