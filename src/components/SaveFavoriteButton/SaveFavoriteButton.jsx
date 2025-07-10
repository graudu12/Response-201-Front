import { useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

import styles from "./SaveFavoriteButton.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteRecipeAsync } from "../../redux/recipes/operations";
import {
  selectIsLoggedIn,
  selectFavoriteRecipes,
} from "../../redux/auth/selectors";
import { clearRecipes } from "../../redux/recipes/slice";
import { fetchFavoriteRecipes } from "../../redux/recipes/operations";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";

const makeSelectIsFavorite = (recipeId) =>
  createSelector([selectFavoriteRecipes], (favoriteRecipes) =>
    favoriteRecipes.includes(recipeId)
  );

function SaveFavoriteButton({ small, recipeId, mode }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isFavorite = useSelector(makeSelectIsFavorite(recipeId));

  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    try {
      await dispatch(toggleFavoriteRecipeAsync({ recipeId, mode })).unwrap();
      if (mode === "favorites" && isFavorite) {
        dispatch(clearRecipes());
        dispatch(fetchFavoriteRecipes({ page: 1, perPage: 12, append: false }));
      }
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

      {/* Модальное окно для аутентификации */}
      <AuthPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default SaveFavoriteButton;
