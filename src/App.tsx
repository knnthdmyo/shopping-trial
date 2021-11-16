import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseLoader from './components/common/loader';
import Products from './providers/store';
import * as ROUTES from './constants/routes';
import { ProductTypes } from './constants/types';

const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const AddNew = lazy(() => import('./pages/AddNew'));

const App = () => {
  const [productLists, setProductList] = useState({ products: [], cart: [], });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProductList((prevState) => ({ ...prevState, products: json })))
      .catch((err) => console.error(err))
  }, []);

  const cart_add = (cart: ProductTypes[]) => {
    setProductList((prevState) => ({ ...prevState, cart: cart }))
    return cart;
  }

  const cart_remove = (cart: ProductTypes[]) => {
    setProductList((prevState) => ({ ...prevState, cart: cart }))
    return cart;
  }

  const _create = (body: ProductTypes) => {
    const new_id = productLists.products[productLists.products.length - 1].id + 1;

    console.log(new_id);
    return body;
  }

  const _update = (body: ProductTypes) => {
    const new_id = productLists.products[productLists.products.length - 1].id + 1;

    console.log(new_id);
    return body;
  }

  const _delete = (body: ProductTypes) => {
    const new_id = productLists.products[productLists.products.length - 1].id + 1;

    console.log(new_id);
    return body;
  }

  return (
    <Products.Provider
      value={{
        ...productLists,
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
        create: _create,
        update: _update,
        delete: _delete,
        cart_remove: cart_remove,
        cart_add: cart_add,
      }}
    >
      <Router>
        <Suspense fallback={<BaseLoader />}>
          <nav className="sticky top-0 z-10 flex flex-grow p-5 w-screen text-center text-grey-darkest items-center sm:justify-between bg-white">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-2xl hover:text-blue">
              <i className="bi bi-shop-window text-2xl" />
              Shopping - Trial
            </Link>
            <div className="flex gap-4 justify-between">
              <Link to={ROUTES.CART} className="flex px-4 gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                <span>
                  <i className="bi bi-cart" />
                  {productLists.cart.length}
                </span>
                Cart
              </Link>
            </div>
          </nav>
          <div className="m-auto w-screen">
            <Routes>
              <Route path={ROUTES.HOME} element={<Shop />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.NEW_ITEM} element={<AddNew />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </Products.Provider>
  );
}

export default App;