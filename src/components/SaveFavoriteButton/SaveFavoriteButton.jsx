import { useState, useEffect } from "react";
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
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes.includes(recipeId)
  );
  //const isFavorite = favoriteRecipes.includes(recipeId);
  useEffect(() => {
    setIsFavorite(favoriteRecipes.includes(recipeId));
  }, [favoriteRecipes, recipeId]);

  const handleToggle = async () => {
    const wasFavorite = isFavorite;

    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite); // миттєва зміна
    try {
      await dispatch(toggleFavoriteRecipeAsync({ recipeId, mode })).unwrap();
    } catch (error) {
      setIsFavorite(wasFavorite);
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
        <svg className={styles.icon} width="24" height="24">
          <use href={`/svg/sprite.svg#${iconId}`} />
        </svg>
        {!small && (isFavorite ? "Remove from favorites" : "Save")}
      </button>

      <AuthPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default SaveFavoriteButton;
