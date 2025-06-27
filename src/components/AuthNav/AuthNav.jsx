import clsx from "clsx";
import css from "../AuthNav/AuthNav.module.css";
import { NavLink } from "react-router-dom";

export default function AuthNav() {
  function getClassActiveLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <div className={css.authContainer}>
      <NavLink className={getClassActiveLink} to="/login">
        Log in
      </NavLink>
      <NavLink className={clsx(css.authRegister)} to="/register">
        Register
      </NavLink>
    </div>
  );
}
