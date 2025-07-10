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
} from "../../redux/recipes/operations";
import Loader from "../../components/Loading/Loading";

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
  // const [loading, setLoading] = useState(false);
  const loading = useSelector((state) => state.recipes.loading);
  const [startIndex, setStartIndex] = useState(null);
  const recipesListRef = useRef(null);
  useEffect(() => {
    dispatch(clearRecipes());
    setPage(1); // сбрасываем страницу, иначе будет догружать с текущей
  }, [mode, dispatch]);

  useEffect(() => {
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
      }
    };

    fetch();
  }, [dispatch, page, mode]);

  /*const loadMore = () => {
    setPage((prev) => prev + 1);
  };*/
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    setStartIndex((nextPage - 1) * recipesPerPage);
  };

  useEffect(() => {
    if (
      startIndex !== null &&
      recipes[startIndex] !== undefined &&
      recipesListRef.current
    ) {
      requestAnimationFrame(() => {
        recipesListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [recipes, startIndex]);
  useEffect(() => {
    if (!loading) {
      setStartIndex(null);
    }
  }, [loading]);
  const recipesToShow = recipes.slice(0, page * recipesPerPage);
  return (
    <section className={css.profilePage}>
      <div className={css.container}>
        <h1 className={css.title}>My profile</h1>
        <ProfileNavigation />
        <p className={css.totalRecipes}>{totalItems} recipes</p>
        {loading && <Loader />}
        <RecipesList
          mode={mode}
          recipes={recipesToShow}
          loading={loading}
          ref={recipesListRef}
          startIndex={startIndex}
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
