import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/selectors';

export default function PrivateRoute({ children, ...routeProps }) {
  const token = useSelector(getToken);
  return token ? children : <Navigate to="/login" />;
}
