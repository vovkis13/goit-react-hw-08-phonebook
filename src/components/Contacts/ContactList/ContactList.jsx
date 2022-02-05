import { useSelector } from 'react-redux';
import { useGetItemsQuery } from 'services/contactsApi';
import { getFilteredContacts, getToken } from 'redux/selectors';
import Contact from 'components/Contacts/ContactList/Contact';
import s from './ContactList.module.css';

export default function ContactList() {
  const { isFetching, error, isError } = useGetItemsQuery();
  const filteredContacts = useSelector(getFilteredContacts);
  const token = useSelector(getToken);
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
