import { useState } from "react";
import styles from "./SaveFavoriteButton.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavoriteRecipeAsync } from "../../redux/recipes/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
function SaveFavoriteButton({ small, recipeId, mode }) {
  const isLoggedIn = useSelector(selectIsLoggedIn); // потом добавь вместо функции true, selectIsLoggedIn
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const favoriteRecipes = useSelector(
    (state) => state.auth.user?.favoriteRecipes ?? []
  );
  const isFavorite = favoriteRecipes.includes(recipeId);

  const handleToggle = async () => {
    const wasFavorite = isFavorite;
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await dispatch(toggleFavoriteRecipeAsync({ recipeId, mode })).unwrap();
    } catch (error) {
      if (!wasFavorite) {
        toast.error("Failed to add to favorites 😢");
      } else if (wasFavorite) {
        toast.error("Failed to remove from favorites 😢");
      }
    }
  };
  const handleMouseEnter = () => {
    if (small && isFavorite) setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const iconId = hovered ? "icon-delete" : "icon-saved";
  return (
    <button
      onClick={handleToggle}
      className={`${
        small ? styles.smallFavoriteButton : styles.favoriteButton
      } ${isFavorite ? styles.active : ""}`}
      aria-label={isFavorite ? "Remove" : "Add to favorites"}
      onMouseEnter={small ? handleMouseEnter : undefined}
      onMouseLeave={small ? handleMouseLeave : undefined}
    >
      <>
        <svg className={`${styles.icon}`} width="24" height="24">
          <use href={`/svg/sprite.svg#${iconId}`} />
        </svg>
        {!small && (isFavorite ? "Remove from favorites" : "Save")}
      </>
    </button>
  );
}

export default SaveFavoriteButton;
