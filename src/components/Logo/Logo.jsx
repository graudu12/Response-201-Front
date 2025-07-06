import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = ({ className }) => {
  return (
    <NavLink to="/" className={`${css.logo} ${className || ""}`}>
      <svg className={css.logoIcon} width="30" height="30">
        <use href={`/svg/sprite.svg#icon-logo`} />
      </svg>
      <span className={css.logoText}>Tasteorama</span>
    </NavLink>
  );
};

export default Logo;
