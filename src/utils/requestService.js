import axios from 'axios';

export default class RequestService {
  async get(url) {
    let data = await(await(axios.get(url)
      .then(res => res.data)
      .catch(err => console.error('Error: ', err))
    ));

    return data;
  }
}
