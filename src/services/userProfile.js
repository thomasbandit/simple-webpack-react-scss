import RestApiClient from '../utils/RestApiClient';

export default () => {
  const client = new RestApiClient({
    baseURL: 'https://api.github.com/'
  });

  return {
    get: (login = null) => client.request({
      method: 'GET',
      url: `users/${login}`,
    }),

    getAll: (lastId = null) => client.request({
      method: 'GET',
      url: lastId? `/users?since=${lastId}` : '/users',
    }),
  }
};
