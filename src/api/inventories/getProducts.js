import HttpHelper from '../httpref';

const getProducts = (params) => {
  return HttpHelper({
    method: 'GET', 
    path: 'inventories/products',
    request : params 
  })
}


export default getProducts; 