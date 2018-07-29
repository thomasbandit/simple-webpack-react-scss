import axios from 'axios';
import * as constants from '../constants/userProfile';
// import fetchResultHandling from '../../utils/fetchResultHandling';

// class RequestService {
//   // async function
//   async getRequest(url){
//     let data = await (await (fetch(url)
//       .then(res => res.json())
//       .catch(err => console.log('Error: ', err))
//     ));

//     return data;
//   }
// }

// const requestService = new RequestService;

// class NetworkService {
//   getUser(login) {
//     var url = `https://api.github.com/users/${login}`;
//     return requestService.getRequest(url);
//   }
// }

// const networkService = new NetworkService;

// const data = {
//   "login": "mojombo",
//   "id": 1,
//   "node_id": "MDQ6VXNlcjE=",
//   "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/mojombo",
//   "html_url": "https://github.com/mojombo",
//   "followers_url": "https://api.github.com/users/mojombo/followers",
//   "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
//   "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
//   "organizations_url": "https://api.github.com/users/mojombo/orgs",
//   "repos_url": "https://api.github.com/users/mojombo/repos",
//   "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/mojombo/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": "Tom Preston-Werner",
//   "company": null,
//   "blog": "http://tom.preston-werner.com",
//   "location": "San Francisco",
//   "email": null,
//   "hireable": null,
//   "bio": null,
//   "public_repos": 60,
//   "public_gists": 62,
//   "followers": 21141,
//   "following": 11,
//   "created_at": "2007-10-20T05:24:19Z",
//   "updated_at": "2018-07-13T15:43:19Z"
// };

// export const loadUserProfile = login => dispatch =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       dispatch({
//         type: constants.LOAD_USER_PROFILE_SUCCESS,
//         data: data,
//       });
//       resolve(data);
//     }, 2500);
//   })

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

      // networkService.getUser(login)
      //   .then(data => {
      //     dispatch({
      //       type: constants.LOAD_USER_PROFILE_SUCCESS,
      //       data: res,
      //     });
      //     resolve(data.data);
      //   });

      // fetch(`https://api.github.com/users/${login}`)
      //   .then(fetchResultHandling.checkStatus)
      //   .then(fetchResultHandling.parseResponse)
      //   .then((res) => {
      //     dispatch({
      //       type: constants.LOAD_USER_PROFILE_SUCCESS,
      //       data: res,
      //     });
      //     resolve(res.data);
      //   })
      //   .catch(err => dispatch({ type: constants.LOAD_USER_PROFILE_FAIL }));

      axios.get(`https://api.github.com/users/${login}`)
        .then(function (response) {
          // handle success
          console.log(response);
           dispatch({
            type: constants.LOAD_USER_PROFILE_SUCCESS,
            data: response.data,
          });
          resolve(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          dispatch({ type: constants.LOAD_USER_PROFILE_FAIL })
        });
    }
  });
