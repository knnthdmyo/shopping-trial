import { createContext, } from 'react';
import { ProductTypes } from '../constants/types';

const products = createContext({
  products: [],
  cart: [],
  updateCart: (a: ProductTypes[]) => a,
});

export default products;