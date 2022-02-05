import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useGetUserQuery } from 'services/usersApi';
import { useGetItemsQuery } from 'services/contactsApi';
import { changeToken } from 'redux/tokenSlice';
import { getToken } from 'redux/selectors';
import UserMenu from 'components/UserMenu';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import SignupForm from 'components/SignupForm';
import LoginForm from 'components/LoginForm';
import Contacts from 'components/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const getUserResult = useGetUserQuery(token);
  const getContactsResult = useGetItemsQuery(token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(changeToken(token));
      getUserResult.refetch();
      getContactsResult.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserMenu />
      {(getUserResult.isFetching || getContactsResult.isFetching) && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!getUserResult.isFetching && !getContactsResult.isFetching && (
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/signup"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <SignupForm />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/contacts" />} />
        </Routes>
      )}
    </>
  );
}
