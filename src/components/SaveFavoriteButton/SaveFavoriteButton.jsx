import { useState } from "react";
import styles from "./SaveFavoriteButton.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteRecipeAsync } from "../../redux/recipes/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";

function SaveFavoriteButton({ small, recipeId, mode }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteRecipes = useSelector(
    (state) => state.auth.user?.favoriteRecipes ?? []
  );

  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isFavorite = favoriteRecipes.includes(recipeId); // ❗ вычисляем напрямую

  const handleToggle = async () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    try {
      await dispatch(toggleFavoriteRecipeAsync({ recipeId, mode })).unwrap();
    } catch (error) {
      if (!isFavorite) {
        toast.error("Failed to add to favorites 😢");
      } else {
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
    <>
      <button
        onClick={handleToggle}
        className={`${
          small ? styles.smallFavoriteButton : styles.favoriteButton
        } ${isFavorite ? styles.active : ""}`}
        aria-label={isFavorite ? "Remove" : "Add to favorites"}
        onMouseEnter={small ? handleMouseEnter : undefined}
        onMouseLeave={small ? handleMouseLeave : undefined}
      >
        <svg
          className={`${styles.icon} ${
            !small && isFavorite ? styles.iconFilledWhite : ""
          }`}
          width="24"
          height="24"
        >
          <use href={`/svg/sprite.svg#${iconId}`} />
        </svg>
        {!small && (isFavorite ? "Remove" : "Save")}
      </button>

      <AuthPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default SaveFavoriteButton;
