import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from 'redux/selectors';
import { getContacts } from 'redux/operations';
import Contact from 'components/Contact';
import s from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getContacts()), []);

  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <ul className={s.contacts}>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
