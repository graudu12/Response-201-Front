//src/pages/HomePage/HomePage.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import css from "./HomePage.module.css";

// import Hero from "../../components/Hero/Hero";
// import RecipesList from "../../components/RecipesList/RecipesList";
// import Filters from "../../components/Filters/Filters";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

// import {
//   fetchRecipes,
//   fetchRecipesByQuery,
//   toggleFavoriteRecipeAsync,
// } from "../../redux/recipes/operations";
// import { clearRecipes, clearNotFound } from "../../redux/recipes/slice";
// import { changeFilter } from "../../redux/filters/slice";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const recipes = useSelector((state) =>
//     Array.isArray(state.recipes.items) ? state.recipes.items : []
//   );
//   const totalItems = useSelector((state) => state.recipes.totalItems);
//   const searchQuery = useSelector((state) => state.filters.name);

//   const [page, setPage] = useState(1);
//   const recipesPerPage = 12;
//   const [loading, setLoading] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: "",
//     ingredient: "",
//   });

//   const recipesListRef = useRef(null);

//   const handleFilterChange = useCallback((filters) => {
//     setSelectedFilters((prevFilters) => {
//       if (
//         prevFilters.category === filters.category &&
//         prevFilters.ingredient === filters.ingredient
//       ) {
//         return prevFilters;
//       }
//       return filters;
//     });
//     setPage(1);
//   }, []);

//   useEffect(() => {
//     if (location.pathname === "/") {
//       dispatch(changeFilter({ name: "" }));
//       dispatch(clearNotFound());
//     }
//   }, [location.pathname, dispatch]);

//   useEffect(() => {
//     if (searchQuery) return;

//     setLoading(true);
//     dispatch(
//       fetchRecipes({
//         page,
//         perPage: recipesPerPage,
//         category: selectedFilters.category,
//         ingredient: selectedFilters.ingredient,
//       })
//     )
//       .unwrap()
//       .then(() => setLoading(false))
//       .catch(() => setLoading(false));
//   }, [dispatch, page, selectedFilters, searchQuery]);

//   useEffect(() => {
//     if (!searchQuery) return;

//     setLoading(true);

//     dispatch(clearRecipes());
//     dispatch(fetchRecipesByQuery(searchQuery))
//       .unwrap()
//       .then(() => setLoading(false))
//       .catch(() => setLoading(false));
//   }, [dispatch, searchQuery]);

//   const handleToggleFavorite = (id) => {
//     dispatch(toggleFavoriteRecipeAsync({ recipeId: id }));
//   };

//   const loadMore = () => {
//     setPage((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (page > 1 && recipesListRef.current) {
//       requestAnimationFrame(() => {
//         recipesListRef.current.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [page]);

//   const recipesToShow = searchQuery
//     ? recipes
//     : recipes.slice(0, page * recipesPerPage);

//   return (
//     <div className={css.homePage}>
//       <Hero />

//       <section className={css.container}>
//         <div>
//           <h2 className={css.title}>Recipes</h2>
//         </div>

//         <Filters totalItems={totalItems} onChange={handleFilterChange} />

//         <RecipesList
//           recipes={recipesToShow}
//           loading={loading}
//           onToggleFavorite={handleToggleFavorite}
//           ref={recipesListRef}
//         />

//         <div>
//           {!searchQuery && page * recipesPerPage < totalItems && !loading && (
//             <LoadMoreBtn onClick={loadMore} />
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

//src/pages/HomePage/HomePage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import css from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";
import RecipesList from "../../components/RecipesList/RecipesList";
import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import {
  fetchRecipes,
  fetchRecipesByQuery,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";
import { clearRecipes, clearNotFound } from "../../redux/recipes/slice";
import { changeFilter } from "../../redux/filters/slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const recipes = useSelector((state) =>
    Array.isArray(state.recipes.items) ? state.recipes.items : []
  );
  const totalItems = useSelector((state) => state.recipes.totalItems);
  const searchQuery = useSelector((state) => state.filters.name);

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
    if (location.pathname === "/") {
      dispatch(changeFilter({ name: "" }));
      dispatch(clearNotFound());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (searchQuery) return;

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
  }, [dispatch, page, selectedFilters, searchQuery]);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);

    dispatch(clearRecipes());
    dispatch(fetchRecipesByQuery(searchQuery))
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, searchQuery]);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavoriteRecipeAsync({ recipeId: id }));
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

  const recipesToShow = searchQuery
    ? recipes
    : recipes.slice(0, page * recipesPerPage);

  return (
    <div className={css.homePage}>
      <Hero />

      <section className={css.container}>
        <div>
          {/* 🆕 Динамический заголовок — меняется при поиске */}
          <h2 className={css.title}>
            {searchQuery ? `Search Results for "${searchQuery}"` : "Recipes"}
          </h2>
        </div>

        <Filters totalItems={totalItems} onChange={handleFilterChange} />

        <RecipesList
          recipes={recipesToShow}
          loading={loading}
          onToggleFavorite={handleToggleFavorite}
          ref={recipesListRef}
        />

        <div>
          {!searchQuery && page * recipesPerPage < totalItems && !loading && (
            <LoadMoreBtn onClick={loadMore} />
          )}
        </div>
      </section>
    </div>
  );
}
