import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import styles from "./RecipesList.module.css";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items);
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
  dispatch(fetchRecipes({
    page,
    perPage: recipesPerPage,
    category: selectedFilters.category,
    ingredient: selectedFilters.ingredient,
  }))
    .unwrap()
    .then(() => setLoading(false))
    .catch(() => setLoading(false));
}, [dispatch, page, selectedFilters]);




  const handleToggleFavorite = (id, add) => {
    dispatch(toggleFavoriteRecipeAsync({ id, add }));
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1 && recipesListRef.current) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const list = recipesListRef.current;
          // Знаходимо останній елемент в списку
          const lastRecipe = list.children[list.children.length - 1];
          if (lastRecipe) {
            lastRecipe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }, 200);
    }
  }, [page]);

  const recipesToShow = recipes.slice(0, page * recipesPerPage);

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
      </>
    )}
  </div>
  </section>
);
}
export default RecipesList;
