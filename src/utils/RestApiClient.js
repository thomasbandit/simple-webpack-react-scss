import axios from 'axios';

export default class RestApiClient {
  constructor(config) {
    this.client = axios.create(config);
  }

  request(options) {
    return this.client.request(options);
  }
}
