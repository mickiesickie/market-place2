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

const HttpHelper = ({method, path, request}) => {
  const headers = buildHeaders();
  let opts = {
    headers,
    method:method
  }
  let fullPath = `${apiUrl}/${path}`;

  if (['POST', 'PUT'].includes(method)) {
    opts.body = isBlob ? request : JSON.stringify(request);
  } else if (request) {
    fullPath = fullPath + '?' + new URLSearchParams(request).toString();
  }
    
  return new Promise((resolve, reject) => {
    fetch(fullPath, opts)
      .then((response) => {
        clearTimeout(toId);
        httpError = {
          status: response.status,
          statusText: response.statusText
        };
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          data.error.http = httpError;
        } else {
          data.error = {
            http: httpError
          };
        }
     
        if (data.error.error_code === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        const data = {
          error: {
            http: httpError,
            exception: error.toString()
          }
        };
     
        reject(data);
      });
  });
};

export default HttpHelper;