import { Fragment, useContext, useEffect } from 'react';
import Products from '../../providers/store';

const Cart = () => {

  const { cart } = useContext(Products)

  useEffect(() => { console.log(cart); }, [cart]);

  return (
    <Fragment>
      <h1>Cart</h1>
    </Fragment>
  );
}

export default Cart