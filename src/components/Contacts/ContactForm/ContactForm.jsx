import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { Form, Button, Toast } from 'react-bootstrap';
import { usePostItemMutation } from 'services/contactsApi';
import { changeFilter } from 'redux/filterSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
// import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [postItem, { isLoading, isError, error }] = usePostItemMutation();
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') return setName(value);
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postItem({ name, number });
    dispatch(changeFilter(''));
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            name="number"
            placeholder="Enter number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Add contact</Button>
      </Form>
      {isLoading && <BallTriangle color="#ffaa00" height={80} width={80} />}
      {isError && (
        <Toast>
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-3"
              alt=""
            />
            <strong className="me-auto">Error!</strong>
          </Toast.Header>
          <Toast.Body>{error.status}</Toast.Body>
        </Toast>
      )}
    </>
  );
}
