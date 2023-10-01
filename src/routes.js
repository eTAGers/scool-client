import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import Storepage from './pages/StorePage';

// ----------------------------------------------------------------------

export default function Router() {
  const isloggedIn = 'userDetails' in localStorage ? JSON.parse(localStorage.getItem('userDetails')).token : '';
  let route = [];
  if (isloggedIn) {
    route = [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <DashboardAppPage /> },
          { path: 'user', element: <UserPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'blog', element: <BlogPage /> },
        ],
      },
      {
        path: 'store',
        element: <Storepage />,
      },
      // {
      //   element: <SimpleLayout />,
      //   children: [
      //     { element: <Navigate to="/dashboard/app" />, index: true },
      //     { path: '404', element: <Page404 /> },
      //     { path: '*', element: <Navigate to="/404" /> },
      //   ],
      // },
      {
        path: '*',
        element: <Navigate to="/dashboard/app" replace />,
      },
    ];
  } else {
    route = [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ];
  }
  const routes = useRoutes(route);

  return routes;
}
