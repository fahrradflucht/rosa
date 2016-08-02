import fetch from 'isomorphic-fetch';
import * as Cookies from 'js-cookie';

const createHeaders = (headers = {}) => (
  Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: Cookies.get('RosaJWT'),
  }, headers)
);

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const httpGet = (url) => (
  fetch(url, {
    headers: createHeaders(),
  })
    .then(checkStatus)
    .then(response => response.json())
);

export const httpPost = (url, data) => (
  fetch(url, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(response => response.json())
);
