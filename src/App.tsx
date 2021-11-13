import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseLoader from './components/common/loader';
import * as ROUTES from './constants/routes';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<BaseLoader />}>
        <nav >
          <ul>
            <li><Link to={ROUTES.HOME}> Home </Link></li>
            <li><Link to={ROUTES.ABOUT}>About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;