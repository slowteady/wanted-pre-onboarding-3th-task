import { Navigate, useRoutes } from 'react-router';
import Error from '../pages/error/Error';
import Search from '../pages/search/Search';
import routerPaths from './routerPaths';

const { home, search, errorRedirect, error } = routerPaths;

function Router() {
  const routes = useRoutes([
    {
      path: home,
      element: <Navigate to={search} replace />
    },
    {
      path: search,
      element: <Search />
    },
    {
      path: errorRedirect,
      element: <Navigate to={error} replace />
    },
    {
      path: error,
      element: <Error />
    }
  ]);

  return routes;
}

export default Router;
