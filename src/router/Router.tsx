import { Navigate, Route, Routes } from 'react-router';
import Error from '../pages/error/Error';
import Search from '../pages/search/Search';
import routerPaths from './routerPaths';

const { home, search, errorRedirect, error } = routerPaths;

function Router() {
  return (
    <Routes>
      <Route path={home} element={<Navigate to={search} replace />} />
      <Route path={search} element={<Search />} />
      <Route path={errorRedirect} element={<Navigate to={error} replace />} />
      <Route path={error} element={<Error />} />
    </Routes>
  );
}

export default Router;
