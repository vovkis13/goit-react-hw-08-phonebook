import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeToken } from 'redux/tokenSlice';
import { useLoginUserMutation } from 'services/usersApi';
import { useGetItemsQuery } from 'services/contactsApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useLoginUserMutation();
  const getItemsResult = useGetItemsQuery();

  const handleSubmit = async e => {
    e.preventDefault();
    const loginResult = await loginUser({ email, password });
    if (loginResult.data) {
      dispatch(changeToken(loginResult.data.token));
      getItemsResult.refetch();
      setEmail('');
      setPassword('');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') return setEmail(value);
    setPassword(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
  );
}
