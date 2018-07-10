const FetchResultHandling = {
  checkStatus: (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  parseResponse: response => response.json().then(json => json || false),
};

export default FetchResultHandling;
