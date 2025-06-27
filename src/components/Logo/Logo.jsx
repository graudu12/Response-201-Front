import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <NavLink to="/" className={css.logo}>
      Tasteorama
    </NavLink>
  );
};

export default Logo;
