import { Routes, Route, Navigate } from 'react-router-dom';
import UserMenu from 'components/UserMenu';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import SignupForm from 'components/SignupForm';
import LoginForm from 'components/LoginForm';
import Contacts from 'components/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <UserMenu />
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
    </>
  );
}
