import { Form, Button, Navbar, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/selectors';
import {
  useLogoutUserMutation,
  useGetCurrentUserQuery,
} from 'services/usersApi';
import Contacts from 'components/Contacts';
// import UserMenu from 'components/UserMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';

export default function App() {
  const [logoutUser] = useLogoutUserMutation();

  const currentToken = useSelector(getToken);
  console.dir('currentToken', currentToken);
  const { data } = useGetCurrentUserQuery(currentToken);
  console.log(data);

  const handleLogout = () => {
    logoutUser(currentToken);
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Phonebook hw.8</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
        <Form className="d-flex">
          <Button
            type="button"
            bg="dark"
            variant="light"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Form>
      </Navbar>
      <SignupForm />
      <LoginForm />
      <Contacts />
    </>
  );
}
