import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getToken } from 'redux/selectors';
import { useLogoutUserMutation, useGetUserQuery } from 'services/usersApi';
import { useGetItemsQuery } from 'services/contactsApi';
import { changeToken } from 'redux/tokenSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './UseMenu.module.css';

export default function App() {
  const [logoutUser] = useLogoutUserMutation();
  const currentToken = useSelector(getToken);
  const { data, isSuccess } = useGetUserQuery(currentToken);
  const dispatch = useDispatch();
  const getItemsResult = useGetItemsQuery();

  const handleLogout = async () => {
    if (currentToken) {
      await logoutUser(currentToken);
      dispatch(changeToken(''));
      getItemsResult.refetch();
    }
  };
  const currentUser = isSuccess ? data.name : '';

  return (
    <Navbar className="mb-3" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">Phonebook hw.8</Navbar.Brand>
        <Nav className={s.nav}>
          {!currentUser && (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? s.active : s.inactive)}
            >
              <Navbar.Text>login</Navbar.Text>
            </NavLink>
          )}
          {!currentUser && (
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? s.active : s.inactive)}
            >
              <Navbar.Text>signup</Navbar.Text>
            </NavLink>
          )}
        </Nav>

        <Navbar.Text>
          {currentUser && `Signed in as: ${currentUser}`}
        </Navbar.Text>
        {currentUser && (
          <Button type="button" variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
