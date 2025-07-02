import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import sprite from "../../svg/sprite.svg";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  // 🛡 Перевірка на null
  if (!user || !user.name) {
    return null; // або <></> або <span>Loading...</span>
  }

  return (
    <div className={css.userMenu}>
      <span className={css.avatar}>{user.name.charAt(0).toUpperCase()}</span>
      <span className={css.username}>{user.name}</span>
      <div className={css.separator}></div>
      <button
        className={css.logoutBtn}
        onClick={handleLogout}
        aria-label="Logout"
      >
        <svg className={css.logoutIcon}>
          <use href={`${sprite}#icon-logout`} />
        </svg>
      </button>
    </div>
  );
};

export default UserMenu;
