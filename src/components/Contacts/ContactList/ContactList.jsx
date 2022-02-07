import { useSelector } from 'react-redux';
import { useGetItemsQuery } from 'services/contactsApi';
import { getFilteredContacts, getToken } from 'redux/selectors';
import Contact from 'components/Contacts/ContactList/Contact';
import s from './ContactList.module.css';

export default function ContactList() {
  const token = useSelector(getToken);
  const { isError, error } = useGetItemsQuery();
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <>
      <ul className={s.contacts}>
        {token &&
          filteredContacts.map(contact => (
            <Contact key={contact.id} contact={contact} />
          ))}
      </ul>
      {isError && <p>{error.status}</p>}
    </>
  );
}
