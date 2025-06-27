import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <NavLink to="/" className={css.logo}>
      <img src={logo} alt="Logo icon" className={css.logoIcon} />
      <span className={css.logoText}>Tasteorama</span>
    </NavLink>
  );
};

export default Logo;
