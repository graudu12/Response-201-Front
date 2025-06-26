import css from "./ContactList.module.css";

import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";

import Contact from "../Contact/Contact.jsx";



export default function ContactList() {
  const items = useSelector(selectFilteredContacts);

  return (
    <div className={css.wrap}>
      <ul className={css.menuList}>
        {items.map((item) => (
          <li className={css.item} key={item.id}>
            <Contact item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
