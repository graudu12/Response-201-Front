import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { clearNotFound } from "../../redux/recipes/slice";
import css from "./Logo.module.css";

const Logo = ({ className }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeFilter({ name: "" }));
    dispatch(clearNotFound());
  };

  return (
    <NavLink
      to="/"
      onClick={handleClick}
      className={`${css.logo} ${className || ""}`}
    >
      <svg className={css.logoIcon} width="30" height="30">
        <use href={`/svg/sprite.svg#icon-logo`} />
      </svg>
      <span className={css.logoText}>Tasteorama</span>
    </NavLink>
  );
};

export default Logo;
