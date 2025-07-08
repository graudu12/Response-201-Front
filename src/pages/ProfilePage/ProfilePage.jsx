import { useParams } from "react-router-dom";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./ProfilePage.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipesList from "../../components/RecipesList/RecipesList";
import { clearRecipes } from "../../redux//recipes/slice";
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
    dispatch(clearRecipes());
    setPage(1); // сбрасываем страницу, иначе будет догружать с текущей
  }, [mode, dispatch]);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        if (mode === "own") {
          await dispatch(
            fetchMyRecipes({ page, perPage: recipesPerPage, append: page > 1 })
          ).unwrap();
        } else if (mode === "favorites") {
          await dispatch(
            fetchFavoriteRecipes({
              page,
              perPage: recipesPerPage,
              append: page > 1,
            })
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
  const handleToggleFavorite = async (id) => {
    console.log("hello");
    try {
      await dispatch(
        toggleFavoriteRecipeAsync({ recipeId: id, mode })
      ).unwrap();

      if (mode === "favorites") {
        const currentCount = recipes.length - 1;
        const expectedCount = page * recipesPerPage;

        if (currentCount < expectedCount && currentCount < totalItems) {
          await dispatch(
            fetchFavoriteRecipes({
              page,
              perPage: recipesPerPage,
              append: true,
            })
          ).unwrap();
        }
      }
    } catch (err) {
      console.error(err);
    }
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
      <div className={css.container}>
        <h1 className={css.title}>My profile</h1>
        <ProfileNavigation />
        <p className={css.totalRecipes}>{totalItems} recipes</p>
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
      </div>
    </section>
  );
};

export default ProfilePage;
