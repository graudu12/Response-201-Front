import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/auth/selectors";



export default function Navigation() {
	
  function getClassActiveLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <nav>
      <ul>
        <li className={css.headerLink}>
          <NavLink className={getClassActiveLink} to="/">
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className={css.headerLink}>
            <NavLink className={getClassActiveLink} to="/contacts">
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
