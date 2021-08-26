import http from '../http';

const AuthEndpoint = {
  login: async (email, password) => {
    const response = await http
      .post('auth/login', {
        email,
        password
      })
      .catch((error) => {});

    if (!response) {
      return { error: 'No se pudo iniciar sesión' };
    }

    if (response.statusCode === 401) {
      return { error: response.message };
    }

    return { accessToken: response.access_token };
  },
  create: async (email, password) => {
    const response = await http
      .post('users/create', {
        email,
        password
      })
      .catch((error) => {});

    return { accessToken: response.access_token };
  }
};

export default AuthEndpoint;
