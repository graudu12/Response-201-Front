// HomePage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./HomePage.module.css";
import Hero from "../../components/Hero/Hero";
import RecipesList from "../../components/RecipesList/RecipesList";
import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items);
  const totalItems = useSelector((state) => state.recipes.totalItems);

  const [page, setPage] = useState(1);
  const recipesPerPage = 12;
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    ingredient: "",
  });

  const recipesListRef = useRef(null);

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
    dispatch(
      fetchRecipes({
        page,
        perPage: recipesPerPage,
        category: selectedFilters.category,
        ingredient: selectedFilters.ingredient,
      })
    )
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
    <div className={css.homePage}>
      <Hero />

      <section>
        <div>
          <h2>Recipes</h2>
        </div>

        <Filters totalItems={totalItems} onChange={handleFilterChange} />

        <RecipesList
          recipes={recipesToShow}
          loading={loading}
          onToggleFavorite={handleToggleFavorite}
          ref={recipesListRef}
        />

        <div>
          {page * recipesPerPage < totalItems && !loading && (
            <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
          )}
        </div>
      </section>
    </div>
  );
}
