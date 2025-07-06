import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import LogoutModal from "../LogoutModal/LogoutModal";
import sprite from "../../svg/sprite.svg";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    setShowModal(false);
  };

  if (!user || !user.name) {
    return null;
  }

  return (
    <>
      <div className={css.userMenu}>
        <span className={css.avatar}>{user.name.charAt(0).toUpperCase()}</span>
        <span className={css.username}>{user.name}</span>
        <div className={css.separator}></div>
        <button
          className={css.logoutBtn}
          onClick={() => setShowModal(true)}
          aria-label="Logout"
        >
          <svg className={css.logoutIcon}>
            <use href={`${sprite}#icon-logout`} />
          </svg>
        </button>
      </div>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default UserMenu;
