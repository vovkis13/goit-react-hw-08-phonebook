import { useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { useGetItemsQuery } from 'services/contactsApi';
import { getFilteredContacts } from 'redux/selectors';
import Contact from 'components/Contacts/ContactList/Contact';
import s from './ContactList.module.css';

export default function ContactList() {
  const { isFetching, error, isError } = useGetItemsQuery();
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <>
      <ul className={s.contacts}>
        {filteredContacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
      {isFetching && <BallTriangle color="#ffaa00" height={80} width={80} />}
      {isError && <p>{error.status}</p>}
    </>
  );
}
