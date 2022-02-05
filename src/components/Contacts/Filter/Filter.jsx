import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { changeFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  return (
    <>
      <Form className={s.filter}>
        <Form.Text>Find contacts by name</Form.Text>
        <Form.Control
          type="text"
          name="filterValue"
          value={filter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces.
            For example Adrian, Jacob Mercer, Charles de Batz de Castelmore
            d'Artagnan"
          placeholder="Enter name"
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </Form>
    </>
  );
}
