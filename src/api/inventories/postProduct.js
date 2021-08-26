import HttpHelper from '../http';

const postProduct = (params) => {
  return HttpHelper({
    method: 'POST', 
    path: 'inventories/products/create',
    request : params 
  })
}


export default postProduct; 