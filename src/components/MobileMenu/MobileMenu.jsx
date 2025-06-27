import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";
import clsx from "clsx";

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
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        <nav className={css.mobileNav}>
          <NavLink to="/" className={css.link} onClick={onClose}>
            Recipes
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className={css.link} onClick={onClose}>
                My Profile
              </NavLink>

              <NavLink
                to="/add"
                className={clsx(css.mobileButton)}
                onClick={onClose}
              >
                Add Recipe
              </NavLink>

              <div className={css.userMini}>
                <span className={css.username}>{user.name}</span>
                <span className={css.avatar}>{user.name[0]}</span>
              </div>

              <button
                className={css.logoutBtn}
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                Logout
              </button>
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
