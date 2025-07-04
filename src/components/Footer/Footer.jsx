import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./Footer.module.css";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/profile/own");
    }
  };

  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <div className={css.logo}>
          <Logo />
        </div>

        <div className={css.copyright}>
          &copy; {new Date().getFullYear()} CookingCompanion. All rights
          reserved.
        </div>

        <nav className={css.nav}>
          <NavLink className={css.link} to="/">
            Recipes
          </NavLink>
          <button className={css.link} onClick={handleProfileClick}>
            Account
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
