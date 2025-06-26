import css from "./UserMenu.module.css";

import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";

import { logOut } from "../../redux/auth/operations";



export default function UserMenu() {
  const user = useSelector(selectUser);

	const dispatch = useDispatch();
	
  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name} ✌️</p>
      <button
        className={css.btn}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
}
