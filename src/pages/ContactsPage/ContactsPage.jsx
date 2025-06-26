import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import Loading from "../../components/Loading/Loading";

import { selectLoading } from "../../redux/contacts/selectors";

import { fetchContacts } from "../../redux/contacts/operations";

export default function ContactsPage() {
  const dispatch = useDispatch();	
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
	
  return (
   <div>
      <ContactForm/>
      <div>{ isLoading && <Loading/> }</div>
      <ContactList />
   </div>
  );
}
