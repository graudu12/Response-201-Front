import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import styles from "./RecipesList.module.css";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
  fetchMyRecipes,
  fetchFavoriteRecipes,
} from "../../redux/recipes/operations";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";

const RecipesList = ({ mode = "" }) => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) =>
    Array.isArray(state.recipes.items) ? state.recipes.items : []
  );
  const totalItems = useSelector((state) => state.recipes.totalItems);

  const [page, setPage] = useState(1);
  const recipesPerPage = 12;
  const [loading, setLoading] = useState(false);

  const recipesListRef = useRef(null);

  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    ingredient: "",
  });

  const handleFilterChange = useCallback((filters) => {
    setSelectedFilters((prevFilters) => {
      if (
        prevFilters.category === filters.category &&
        prevFilters.ingredient === filters.ingredient
      ) {
        return prevFilters;
      }
      return filters;
    });
    setPage(1);
  }, []);

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
        } else {
          await dispatch(
            fetchRecipes({
              page,
              perPage: recipesPerPage,
              category: selectedFilters.category,
              ingredient: selectedFilters.ingredient,
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
  }, [dispatch, page, selectedFilters, mode]);

  const handleToggleFavorite = (id, add) => {
    dispatch(toggleFavoriteRecipeAsync({ id, add }));
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (
      page > 1 &&
      recipesListRef.current &&
      recipesListRef.current.children != null &&
      recipesListRef.current.children.length > 0
    ) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const list = recipesListRef.current;
          if (!list || !list.children) return;
          // Знаходимо останній елемент в списку
          const lastRecipe = list.children[list.children.length - 1];
          if (lastRecipe) {
            lastRecipe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }, 100);
    }
  }, [page]);

  const recipesToShow = recipes.slice(0, page * recipesPerPage);
  //const recipesToShow = recipes;
  return (
    <section className={styles.RecipesList}>
  <div className={styles.recipeListContainer}>
    <div className={styles.FormRecipes}>
      <h2 className={styles.Recipes}>Recipes</h2>
    </div>

   <Filters totalItems={totalItems} onChange={handleFilterChange} />

    {loading ? (
      <Loading />
    ) : (
      <>
        {!loading && recipes.length === 0 && (
  <p className={styles.noRecipesText}>No recipes found.</p>
)}

        <div className={styles.recipeslist} ref={recipesListRef}>
          {recipesToShow.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

          <div className={styles.BtnLoadWrapper}>
            <div className={styles.BtnLoad}>
              {page * recipesPerPage < totalItems && (
                <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
              )}
            </div>
          </div>
        </div>
      </>
    )}
  </div>
  </section>
);
}
export default RecipesList;
