import { createContext, } from 'react';

const products = createContext({
  products: [],
  cart: [],
});

export default products;