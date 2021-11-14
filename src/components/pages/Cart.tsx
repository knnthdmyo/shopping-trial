import { Fragment, useContext, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Products from '../../providers/store';

const Cart = () => {

  const { cart } = useContext(Products)

  useEffect(() => { console.log(cart); }, [cart]);

  return (
    <Fragment>
      <Navbar
        handleSearch={() => { }}
        handleToggleChange={() => { }}
        hideFilterButton
      />
    </Fragment>
  );
}

export default Cart