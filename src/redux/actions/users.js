import axios from 'axios';
import * as constants from '../constants/users';
// import fetchResultHandling from '../../utils/fetchResultHandling';

// eslint-disable-next-line import/prefer-default-export
export function loadUsers() {
  return (dispatch, getState) =>
    new Promise(resolve => {
      const { users: { users } } = getState();
      let lastId = null;

      if (users.length) {
        lastId = users[users.length - 1].id;
      }

      dispatch({ type: constants.LOAD_USERS });

      const apiUrl = !lastId ? 'https://api.github.com/users' : `https://api.github.com/users?since=${lastId}`;

      axios.get(apiUrl)
        .then(function (response) {
          // handle success
          console.log(response);
           dispatch({
            type: constants.LOAD_USERS_SUCCESS,
            data: response.data,
          });
          resolve(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          dispatch({ type: constants.LOAD_USERS_FAIL })
        });

      // return fetch(apiUrl)
      //   .then(fetchResultHandling.checkStatus)
      //   .then(fetchResultHandling.parseResponse)
      //   .then((res) => {
      //     dispatch({
      //       type: constants.LOAD_USERS_SUCCESS,
      //       data: res,
      //     });
      //   })
      //   .catch(err => dispatch({ type: constants.LOAD_USERS_FAIL }));
    });
}
