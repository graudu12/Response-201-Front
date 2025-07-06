import { useParams } from "react-router-dom";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./ProfilePage.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipesList from "../../components/RecipesList/RecipesList";

import {
  fetchMyRecipes,
  fetchFavoriteRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";

const ProfilePage = () => {
  const { recipeType } = useParams(); // ⬅️ own або favorites
  const mode = recipeType;
  const dispatch = useDispatch();
  const recipes = useSelector((state) =>
    Array.isArray(state.recipes.items) ? state.recipes.items : []
  );
  const totalItems = useSelector((state) => state.recipes.totalItems);

  const [page, setPage] = useState(1);
  const recipesPerPage = 12;
  const [loading, setLoading] = useState(false);
  const recipesListRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        if (mode === "own") {
          await dispatch(
            fetchMyRecipes({ page, perPage: recipesPerPage })
          ).unwrap();
        } else if (mode === "favorites") {
          await dispatch(
            fetchFavoriteRecipes({ page, perPage: recipesPerPage })
          ).unwrap();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [dispatch, page, mode]);
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavoriteRecipeAsync({ recipeId: id, mode }));
  };
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1 && recipesListRef.current) {
      requestAnimationFrame(() => {
        recipesListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [page]);

  //const recipesToShow = recipes.slice(0, page * recipesPerPage);
  return (
    <section className={css.profilePage}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <p>{totalItems} recipes</p>
      <RecipesList
        mode={mode}
        recipes={recipes /*ToShow*/}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
        ref={recipesListRef}
      />
      <div>
        {page * recipesPerPage < totalItems && !loading && (
          <LoadMoreBtn onClick={loadMore} />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
