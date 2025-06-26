import css from "../AppBar/AppBar.module.css";

import { useSelector } from "react-redux";

import { selectLoggedIn } from "../../redux/auth/selectors";

import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";



export default function AppBar() {
  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <header className={css.container}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
