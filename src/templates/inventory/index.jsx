import React from 'react';
import { useSelector } from 'react-redux';
import Empty from './empty';
import List from './list';
import InventoryApi from '../../api/inventories';

export default function Inventory() {
  const hasToken = useSelector((state) => Boolean(state.session.token));

  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    const products = await InventoryApi.getProducts();

    setProducts(products);
  };

  React.useEffect(() => {
    if (hasToken) {
      getProducts();
    }
  }, [hasToken]);

  const onAfterSave = () => getProducts();

  return (
    <React.Fragment>
      {(!hasToken || products.length === 0) && <Empty onAfterSave={onAfterSave} />}
      {hasToken && products.length > 0 && <List onAfterSave={onAfterSave} products={products} />}
    </React.Fragment>
  );
}
