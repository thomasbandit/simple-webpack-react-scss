import axios from 'axios';
import * as constants from '../constants/userProfile';
import service from '../../services/userProfile';

// eslint-disable-next-line import/prefer-default-export
export const loadUserProfile = login => (dispatch, getState) =>
  new Promise(resolve => {
    const { users: { users } } = getState();

    let profile = null;

    if (users.length) {
      profile = users.find(user => user.login === login);

      dispatch({
        type: constants.LOAD_USER_PROFILE_SUCCESS,
        data: profile,
      });
      resolve(profile);
    }

    if (!profile) {
      dispatch({ type: constants.LOAD_USER_PROFILE });

      service().get(login)
        .then(function (response) {
          // handle success
          console.log('userProfile response => ', response);
           dispatch({
            type: constants.LOAD_USER_PROFILE_SUCCESS,
            data: response.data,
          });
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          dispatch({ type: constants.LOAD_USER_PROFILE_FAIL })
        });
    }
  });
