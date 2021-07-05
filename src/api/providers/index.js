import http from '../http';

const ProviderEndpoint = {
  getProductsAsBuyer: (body) => {
    return http.post('providers/products', body).catch(error => []);
  },
  getProductsAsAdmin: (body) => {
    return http.post('providers/admin/products', body).catch(error => []);
  }
};

export default ProviderEndpoint;