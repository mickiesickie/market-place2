import store from '../redux/store';
import { setToken } from '../redux/session';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const buildHeaders = () => {
  let headers = { ...apiHeaders };
  const token = store.getState().session.token;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const HttpHelper = {
  post: (path, body) => {
    const headers = buildHeaders();

    return fetch(`${apiUrl}/${path}`, {
        method: 'POST',
        headers,
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body)
    }).then(res => res.json()).then(response => {
      if (typeof response === 'object' && !Array.isArray(response)) {
        if (response.statusCode === 401) {
          store.dispatch(setToken(null));
        }
      }

      return response;
    });
  },
  get: (path) => {
    const headers = buildHeaders();

    return fetch(`${apiUrl}/${path}`, {
        method: 'GET',
        headers,
        mode: 'cors',
        credentials: 'include'
    }).then(res => res.json());
  },
};

export default HttpHelper;