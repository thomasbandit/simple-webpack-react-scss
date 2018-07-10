import 'whatwg-fetch';
import * as constants from '../constants/users';
import fetchResultHandling from '../../utils/fetchResultHandling';

// eslint-disable-next-line import/prefer-default-export
export function loadUsers() {
  return (dispatch, getState) => {
    const { users: { users } } = getState();
    let lastId = null;

    if (users.length) {
      lastId = users[users.length - 1].id;
    }

    dispatch({ type: constants.LOAD_USERS });

    const apiUrl = !lastId ? 'https://api.github.com/users' : `https://api.github.com/users?since=${lastId}`;

    return fetch(apiUrl)
      .then(fetchResultHandling.checkStatus)
      .then(fetchResultHandling.parseResponse)
      .then((res) => {
        dispatch({
          type: constants.LOAD_USERS_SUCCESS,
          data: res,
        });
      })
      .catch(err => dispatch({ type: constants.LOAD_USERS_FAIL }));
  };
}
