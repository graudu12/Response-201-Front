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


  // Забороняємо скролити сторінку під відкритим мобільним меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobileMenuOpen]);


  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />

        {/* Кнопка для мобільного меню */}
        <button
          className={css.burger}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Навігація для десктопів */}
        <div className={css.desktopNav}>
          <Navigation isLoggedIn={isLoggedIn} />
          {isLoggedIn ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <AuthNav />
          )}
        </div>
      </div>

      {/* Мобільне меню */}
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
