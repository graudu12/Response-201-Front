import clsx from "clsx";
import css from "../AuthNav/AuthNav.module.css";

import { NavLink } from "react-router-dom";



export default function AuthNav() {
	
	function getClassActiveLink({ isActive }) {
		return clsx(css.link, isActive && css.active)
	}

	return (
    <div className={css.container}>
      <NavLink className={getClassActiveLink} to="/register">Register</NavLink>
      <NavLink className={getClassActiveLink} to="/login">Log In</NavLink>
    </div>
  );
}