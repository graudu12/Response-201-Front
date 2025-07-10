import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import MobileMenu from "../MobileMenu/MobileMenu";

import css from "./Header.module.css";
import { logOut } from "../../redux/auth/operations";
import { selectLoggedIn, selectUser } from "../../redux/auth/selectors";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />

        <button
          className={css.burger}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className={css.desktopNav}>
          <Navigation isLoggedIn={isLoggedIn} />
          {isLoggedIn ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <AuthNav />
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          user={user}
          onClose={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
