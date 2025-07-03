import Loading from "../Loading/Loading";
import styles from "./SaveFavoriteButton.module.css";
import sprite from "../../svg/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavoriteRecipeAsync } from "../../redux/recipes/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
export default function SaveFavoriteButton({ small, recipeId }) {
  const isLoggedIn = useSelector(selectIsLoggedIn); // потом добавь вместо функции true, selectIsLoggedIn
  const isLoading = useSelector(() => false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteRecipes = useSelector(
    (state) => state.auth.user.favoriteRecipes
  );
  const isFavorite = favoriteRecipes.includes(recipeId);

  const handleToggle = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(toggleFavoriteRecipeAsync(recipeId));
  };
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${
        small ? styles.smallFavoriteButton : styles.favoriteButton
      } ${isFavorite ? styles.active : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <Loading size="20px" />
      ) : (
        <>
          <svg
            className={`${styles.icon} ${
              isFavorite ? styles.iconFilled : styles.iconOutline
            }`}
            width="24"
            height="24"
          >
            <use href={`${sprite}#icon-saved`} />
          </svg>
          {!small && (isFavorite ? "Remove from favorites" : "Save")}
        </>
      )}
    </button>
  );
}
