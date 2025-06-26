
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userMenu}>
      <span className={css.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </span>
      <span className={css.username}>{user.name}</span>
      <button className={css.logoutButton} onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
};

export default UserMenu;