import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectLoggedIn);

  const getClassActiveLink = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <nav>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/" className={getClassActiveLink}>
            Recipes
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li className={css.navItem}>
              <NavLink to="/profile" className={getClassActiveLink}>
                My Profile
              </NavLink>
            </li>

            <li className={css.navItem}>
              <NavLink to="/add" className={clsx(css.mobileButton)}>
                Add Recepy
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
