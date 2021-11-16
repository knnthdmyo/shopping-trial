import { createContext, } from 'react';
import { ProductTypes } from '../constants/types';

const products = createContext({
  products: [],
  cart: [],
  initialState: {
    id: 0,
    title: '',
    description: '',
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
    category: '',
    image: '',
  },
  create: (a: ProductTypes) => a,
  update: (a: ProductTypes) => a,
  delete: (a: ProductTypes) => a,
  cart_add: (a: ProductTypes[]) => a,
  cart_remove: (a: ProductTypes[]) => a
});

export default products;