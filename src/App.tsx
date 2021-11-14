import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseLoader from './components/common/loader';
import Products from './providers/store';
import * as ROUTES from './constants/routes';

const Shop = lazy(() => import('./components/pages/Shop'));
const Cart = lazy(() => import('./components/pages/Cart'));

const App = () => {
  const [productLists, setProductList] = useState({ products: [], cart: [], });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProductList((prevState) => ({ ...prevState, products: json })))
      .catch((err) => console.error(err))
  }, []);

  return (
    <Products.Provider value={productLists}>
      <Router>
        <Suspense fallback={<BaseLoader />}>
          <nav className="sticky top-0 z-10 flex flex-grow p-5 w-screen text-center text-grey-darkest items-center sm:justify-between bg-white">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-2xl hover:text-blue">
              <i className="bi bi-shop-window text-2xl" />
              Shopping - Trial
            </Link>
            <div className="flex gap-4 justify-between">
              <Link to={ROUTES.ABOUT} className="flex px-4 gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                <span>
                  <i className="bi bi-cart" />
                </span>
                Cart
              </Link>
            </div>
          </nav>
          <div className="m-auto w-screen">
            <Routes>
              <Route path={ROUTES.HOME} element={<Shop />} />
              <Route path={ROUTES.ABOUT} element={<Cart />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </Products.Provider>
  );
}

export default App;