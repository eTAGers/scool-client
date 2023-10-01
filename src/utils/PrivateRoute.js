import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ path, element, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Route path={path} element={element} />;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
