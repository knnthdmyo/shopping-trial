import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseLoader from './components/common/loader';
import * as ROUTES from './constants/routes';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Blogs = lazy(() => import('./components/pages/Blogs'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<BaseLoader />}>
        <nav className="flex flex-grow p-5 w-screen text-center text-grey-darkest items-center sm:justify-between bg-white">
          <Link to={ROUTES.HOME} className="hover:text-blue-dark">Home</Link>
          <div className="flex justify-between">
            <Link to={ROUTES.BLOGS} className="flex px-4 gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
              <i className="bi bi-shop"></i>
              Shop
            </Link>
            <Link to={ROUTES.ABOUT} className="flex px-4 gap-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
              <i className="bi bi-cart"></i>
              Cart
            </Link>
          </div>
        </nav>
        <div className="m-auto w-11/12">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.BLOGS} element={<Blogs />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;