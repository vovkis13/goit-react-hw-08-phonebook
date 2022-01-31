import { Form, Button, Navbar, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from 'redux/selectors';
import {
  useLogoutUserMutation,
  useGetCurrentUserQuery,
} from 'services/usersApi';
import Contacts from 'components/Contacts';
import { changeToken } from 'redux/tokenSlice';
// import UserMenu from 'components/UserMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';

export default function App() {
  const [logoutUser] = useLogoutUserMutation();
  const currentToken = useSelector(getToken);
  const { data, isSuccess } = useGetCurrentUserQuery(currentToken);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    if (currentToken) {
      logoutUser(currentToken);
      dispatch(changeToken(''));
    }
  };
  const currentUser = isSuccess ? data.name : '';
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Phonebook hw.8</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {currentUser && `Signed in as: ${currentUser}`}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
        <Form className="d-flex">
          {currentUser && (
            <Button type="button" variant="light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Form>
      </Navbar>
      {/* <SignupForm /> */}
      <LoginForm />
      <Contacts />
    </>
  );
}
