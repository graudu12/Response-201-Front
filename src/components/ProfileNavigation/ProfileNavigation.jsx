import css from "../ProfileNavigation/ProfileNavigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function ProfileNavigation() {
  const getClassActiveLink = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/profile/own" className={getClassActiveLink}>
            My Recipes
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/profile/favorites" className={getClassActiveLink}>
            Saved Recipes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
