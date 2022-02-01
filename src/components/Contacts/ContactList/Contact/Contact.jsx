import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { changeFilter } from 'redux/filterSlice';
import { useDeleteItemMutation, useGetItemsQuery } from 'services/contactsApi';
// import s from './Contact.module.css';

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const [deleteContact, { isError, error }] = useDeleteItemMutation();
  useGetItemsQuery();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(changeFilter(''));
    deleteContact(id);
  };

    const handleEdit = e => {
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
              <Card.Text>{number}</Card.Text>
              {/* <Button
                variant="primary"
                type="button"
                value={id}
                onClick={handleEdit}
              >
                Edit
              </Button> */}
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
    number: PropTypes.string.isRequired,
  }).isRequired,
};
