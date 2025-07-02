import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteRecipeAsync } from "../../redux/recipes/operations";
import sprite from "../../svg/sprite.svg";
import styles from "./FavoriteButton.module.css"; // базові стилі
import { useNavigate } from "react-router-dom";
//import { selectIsLoggedIn } from '../../redux/auth/selectors';
const FavoriteButton = ({ recipeId, className = "", children }) => {
  const isLoggedIn = useSelector(() => true); // потом добавь вместо функции true, selectIsLoggedIn
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteRecipes = useSelector(
    (state) => state.auth.user.favoriteRecipes
  );
  const isFavorite = favoriteRecipes.includes(recipeId);

  const handleToggle = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    dispatch(toggleFavoriteRecipeAsync(recipeId));
  };

  return (
    <button
      onClick={handleToggle}
      className={`${isFavorite ? styles.favoriteActive : styles.favorite} ${
        className || ""
      }`.trim()} // додаємо якщо потрібно свої стилі у className
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {children}
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24">
        <use href={`${sprite}#${isFavorite ? "icon-delete" : "icon-saved"}`} />
      </svg>
    </button>
  );
};

export default FavoriteButton;
