import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { getUserDetails } from './utils/utility';

// Layouts
const DashboardLayout = lazy(() => import('./layouts/dashboard'));

// Pages
const BlogPage = lazy(() => import('./pages/BlogPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
// const Page404 = lazy(() => import('./pages/Page404'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const DashboardAppPage = lazy(() => import('./pages/DashboardAppPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const Storepage = lazy(() => import('./pages/StorePage'));

export default function Router() {
  const isloggedIn = 'userDetails' in localStorage ? JSON.parse(localStorage.getItem('userDetails')).token : '';
  let route = [];
  if (isloggedIn) {
    if (getUserDetails()?.storename) {
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
          path: 'store',
          element: <Storepage />,
        },
        {
          path: '*',
          element: <Navigate to="/store" replace />,
        },
      ];
    }
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

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
}
