import { useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { getLoading, getError } from 'redux/selectors';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const isLoading = useSelector(getLoading);
  const errorMsg = useSelector(getError);
  return (
    <div>
      <h1>Phonebook (ASYNC REDUX)</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <BallTriangle color="#ffaa00" height={80} width={80} />}
      <ContactList />
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
