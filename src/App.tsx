import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseLoader from './components/common/loader';
import * as ROUTES from './constants/routes';

const Home = lazy(() => import('./components/pages/Home'));
const Cart = lazy(() => import('./components/pages/Cart'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<BaseLoader />}>
        <nav className="sticky top-0 z-10 flex flex-grow p-5 w-screen text-center text-grey-darkest items-center sm:justify-between bg-white">
          <Link to={ROUTES.HOME} className="hover:text-blue-dark">Home</Link>
          <div className="flex justify-between">
            <Link to={ROUTES.ABOUT} className="flex px-4 gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
              <i className="bi bi-cart"></i>
              Cart
            </Link>
          </div>
        </nav>
        <div className="m-auto w-screen">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<Cart />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;