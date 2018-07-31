import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUsers } from '../../actions/users';
import * as constants from '../../constants/users';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => (
  new window.Response(JSON.stringify(response), {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json',
    },
  })
);

const fetchData = [{
  avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
  events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
  followers_url: 'https://api.github.com/users/mojombo/followers',
  following_url: 'https://api.github.com/users/mojombo/following{/other_user}',
  gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
  gravatar_id: '',
  html_url: 'https://github.com/mojombo',
  id: 1,
  login: 'mojombo',
  node_id: 'MDQ6VXNlcjE=',
  organizations_url: 'https://api.github.com/users/mojombo/orgs',
  received_events_url: 'https://api.github.com/users/mojombo/received_events',
  repos_url: 'https://api.github.com/users/mojombo/repos',
  site_admin: false,
  starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
  type: 'User',
  url: 'https://api.github.com/users/mojombo',
}];

describe('Users module', () => {
  it('creates load and loading success actions if the fetching users is successful', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, fetchData)));

    const store = mockStore({
      users: {
        error: false,
        loading: false,
        users: [],
      },
    });

    return store.dispatch(loadUsers())
      .then(() => {
        const expectedActions = store.getActions();

        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: constants.LOAD_USERS });
        // expect(expectedActions).toContainEqual({
        //   type: constants.LOAD_USERS_SUCCESS,
        //   data: fetchData,
        // });
      });
  });
});
