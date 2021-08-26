import http from '../http';

const UserEndpoint = {
  getUsers: () => {
    return http.get('users').catch((error) => []);
  }
};

export default UserEndpoint;
