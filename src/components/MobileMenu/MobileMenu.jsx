import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";
import clsx from "clsx";
import Logo from "../Logo/Logo"; // імпорт логотипу

const MobileMenu = ({ isLoggedIn, user, onClose, onLogout }) => {
  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Закриття по кліку поза меню
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.mobileMenu}>
        <div className={css.headerRow}>
          <Logo className={css.logo} />
          <button
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className={css.mobileNav}>
          <NavLink to="/" className={css.link} onClick={onClose}>
            Recipes
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className={css.link} onClick={onClose}>
                My Profile
              </NavLink>

              <div className={css.userBox}>
                <div className={css.avatar}>{user.name[0]}</div>
                <span className={css.username}>{user.name}</span>
                <button
                  className={css.logoutIcon}
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  aria-label="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </button>
              </div>

              <NavLink
                to="/add"
                className={clsx(css.mobileButton)}
                onClick={onClose}
              >
                Add Recipe
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={css.link} onClick={onClose}>
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className={clsx(css.mobileButton)}
                onClick={onClose}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
