import 'whatwg-fetch';
import * as constants from '../constants/userProfile';
import fetchResultHandling from '../../utils/fetchResultHandling';

// eslint-disable-next-line import/prefer-default-export
export function loadUserProfile(login) {
  return (dispatch, getState) => {
    const { users: { users } } = getState();

    let profile = null;

    if (users.length) {
      profile = users.find(user => user.login === login);

      dispatch({
        type: constants.LOAD_USER_PROFILE_SUCCESS,
        data: profile,
      });
    }

    if (!profile) {
      dispatch({ type: constants.LOAD_USER_PROFILE });

      fetch(`https://api.github.com/users/${login}`)
        .then(fetchResultHandling.checkStatus)
        .then(fetchResultHandling.parseResponse)
        .then((res) => {
          dispatch({
            type: constants.LOAD_USER_PROFILE_SUCCESS,
            data: res,
          });
        })
        .catch(err => dispatch({ type: constants.LOAD_USER_PROFILE_FAIL }));
    }
  };
}
