import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSignupUserMutation } from 'services/usersApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser] = useSignupUserMutation();

  const handleSubmit = e => {
    console.log(name, email, password);
    e.preventDefault();
    signupUser({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') return setName(value);
    if (name === 'email') return setEmail(value);
    setPassword(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formSignupText">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSignupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSignupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          autoComplete="current-password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
}
