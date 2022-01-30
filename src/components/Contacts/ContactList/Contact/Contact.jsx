import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { changeFilter } from 'redux/filterSlice';
import { useDeleteItemMutation, useGetItemsQuery } from 'services/contactsApi';
// import s from './Contact.module.css';

export default function Contact({ contact: { id, name, phone } }) {
  const dispatch = useDispatch();
  const [deleteContact, { isError, error }] = useDeleteItemMutation();
  useGetItemsQuery();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(changeFilter(''));
    deleteContact(id);
  };

  return (
    <li>
      {!isError && (
        <Card>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{phone}</Card.Text>
            <Button
              variant="primary"
              type="button"
              value={id}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      )}
      {isError && <p>{error.status}</p>}
    </li>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};