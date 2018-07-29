import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';
import { loadUserProfile } from '../../redux/actions/userProfile';
import { ErrorMessage, Page, Preloader } from '../../components';
import IconRight from '../../assets/icons/ic_chevron_right_48px.svg';

const frontload = async props => await props.loadUserProfile(props.match.params.username);
// await props.getCurrentProfile(+props.match.params.id);

class UserProfile extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node,
      }).isRequired,
    }).isRequired,
    profile: PropTypes.shape({
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
    }),
  };

  static defaultProps = {
    profile: {},
  }

  // componentDidMount() {
  //   const {
  //     loadUserProfile,
  //     match: { params },
  //   } = this.props;

  //   // loadUserProfile(params.username);
  // }

  renderLoading() {
    return (
      <div className="container-fluid">
        <div className="row mt-4 mb-3">
          <Preloader />
        </div>
      </div>
    );
  }

  render() {
    const {
      error,
      loading,
      profile,
    } = this.props;

    // if (loading) {
    //   return this.renderLoading();
    // }

    // if (error) {
    //   return <ErrorMessage />;
    // }

    return (
      <Page id="userProfile" title="User Profile" description="This is about really cool stuff.">
        <div className="container-fluid mt-4 mb-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              <IconRight />
              <h3
                className="mb-3"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                }}
              >Profile
              </h3>

              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{profile.id}</td>
                    </tr>
                    <tr>
                      <td>Avatar</td>
                      <td>
                        {profile.avatar_url ?
                          <img
                            src={profile.avatar_url}
                            className="user-thumbnail img-thumbnail"
                            alt={profile.login}
                            style={{ maxWidth: 100, height: 'auto' }}
                          />
                          : ''
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{profile.login}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{profile.login}</td>
                    </tr>
                    <tr>
                      <td>GitHub Profile URL</td>
                      <td>
                        <a
                          href={profile.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profile.html_url}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/" className="btn btn-primary">Return to home</Link>
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  error: state.userProfile.error,
  loading: state.userProfile.loading,
  profile: state.userProfile.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUserProfile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false,
  })(UserProfile)
);
