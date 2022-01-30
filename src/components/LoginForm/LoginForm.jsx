import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeToken } from 'redux/tokenSlice';
import { useLoginUserMutation } from 'services/usersApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, isSuccess } = await loginUser({ email, password });
    console.log(data, isSuccess);
    if (data) dispatch(changeToken(data.token));
    // setEmail('');
    // setPassword('');
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
      <Form.Group className="mb-3" controlId="formLoginCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
