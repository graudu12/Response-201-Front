import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./Footer.module.css";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/profile");
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
          <NavLink className={css.link} to="/recipes">
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
