import http from '../http';

const InventoryEndpoint = {
  getProducts: () => {
    return http.get('inventories/products').catch(error => []);
  },
  createProduct: data => {
    return http.post('inventories/products/create', data).catch(error => []);
  }
};

export default InventoryEndpoint;