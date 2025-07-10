//src/pages/HomePage/HomePage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import css from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";
import RecipesList from "../../components/RecipesList/RecipesList";
import Filters from "../../components/Filters/Filters";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Pagination from "../../components/Pagination/Pagination.jsx";

import {
  fetchRecipes,
  fetchRecipesByQuery,
  //toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";
import { clearRecipes, clearNotFound } from "../../redux/recipes/slice";
import { changeFilter } from "../../redux/filters/slice";
import Loading from "../../components/Loading/Loading.jsx";

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const recipes = useSelector((state) =>
    Array.isArray(state.recipes.items) ? state.recipes.items : []
  );
  const totalItems = useSelector((state) => state.recipes.totalItems);
  const searchQuery = useSelector((state) => state.filters.name);
  const [startIndex, setStartIndex] = useState(null);
  const [page, setPage] = useState(1);
  const recipesPerPage = 12;
  // const [loading, setLoading] = useState(false);
  const loading = useSelector((state) => state.recipes.loading);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    ingredient: "",
  });

  // Новый флаг: включён ли поиск/фильтрация? (логика замены LoadMoreBtn на Pagination "Илья")
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPagination, setIsPagination] = useState(false);
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
    setIsPagination(false);

    // проверка активен ли хоть один фильтр. (логика замены LoadMoreBtn на Pagination "Илья")
    const filterActive =
      filters.category.trim() !== "" || filters.ingredient.trim() !== "";
    setIsFiltering(filterActive);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(changeFilter({ name: "" }));
      dispatch(clearNotFound());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (searchQuery) return;

    // setLoading(true);
    dispatch(
      fetchRecipes({
        page,
        perPage: recipesPerPage,
        category: selectedFilters.category,
        ingredient: selectedFilters.ingredient,
        //append: false,
        append: page > 1 && (searchQuery || isFiltering),
        //append: !isPagination,
        //append: page > 1, // <-- Ось ключова зміна
      })
    ).unwrap();
    // .then(() => setLoading(false))
    // .catch(() => setLoading(false));
  }, [
    dispatch,
    page,
    selectedFilters,
    searchQuery,
    isFiltering /*isPagination*/,
  ]);

  useEffect(() => {
    if (!searchQuery) return;

    // setLoading(true);
    setIsFiltering(true); //  При поиске — тоже filtering (логика замены LoadMoreBtn на Pagination "Илья")
    setIsPagination(false);
    setPage(1);
    dispatch(clearRecipes());
    dispatch(fetchRecipesByQuery(searchQuery)).unwrap();
    // .then(() => setLoading(false))
    // .catch(() => setLoading(false));
  }, [dispatch, searchQuery]);

  /*const handleToggleFavorite = (id) => {
    dispatch(toggleFavoriteRecipeAsync({ recipeId: id }));
  };*/

  /*const loadMore = () => {
    setPage((prev) => prev + 1);
  };*/
  const loadMore = () => {
    setIsPagination(false);
    const nextPage = page + 1;
    setPage(nextPage);

    setStartIndex((nextPage - 1) * recipesPerPage);
  };

  // useEffect(() => {
  // if (
  // startIndex !== null &&
  // recipes[startIndex] !== undefined &&
  //recipesListRef.current
  // ) {
  // requestAnimationFrame(() => {
  // recipesListRef.current.scrollIntoView({
  //   behavior: "smooth",
  //    block: "start",
  //   });
  //  });
  //  }
  // }, [recipes, startIndex]);

  // useEffect(() => {
  //  if (recipesListRef.current && startIndex !== null) {
  //  const recipeExists = recipes[startIndex];

  //   requestAnimationFrame(() => {
  //   if (isPagination) {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //    } else if (recipeExists) {
  //   recipesListRef.current.scrollIntoView({
  //     behavior: "smooth",
  //      block: "start",
  //    });
  //   }

  // ⬅️ Сбрасываем startIndex ТОЛЬКО после scroll
  //  setStartIndex(null);
  //   });
  // }
  // }, [recipes, startIndex, isPagination]);

  //useEffect(() => {
  // if (!loading) {
  //  setStartIndex(null);
  // }
  // }, [loading]);
  useEffect(() => {
    if (!loading && isPagination) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading, isPagination]);

  useEffect(() => {
    if (
      !loading &&
      startIndex !== null &&
      recipes[startIndex] &&
      recipesListRef.current
    ) {
      recipesListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setStartIndex(null);
    }
  }, [loading, recipes, startIndex]);
  const recipesToShow = recipes.slice(0, page * recipesPerPage);

  return (
    <div className={css.homePage}>
      <Hero setIsFiltering={setIsFiltering} />
      <section className={css.container}>
        <div>
          {/* 🆕 Динамический заголовок — меняется при поиске */}
          <h2 className={css.title}>
            {searchQuery ? `Search Results for "${searchQuery}"` : "Recipes"}
          </h2>
        </div>
        <Filters
          totalItems={totalItems}
          onChange={handleFilterChange}
          setIsFiltering={setIsFiltering}
        />
        {loading && <Loading />}
        <RecipesList
          recipes={recipesToShow}
          loading={loading}
          //onToggleFavorite={handleToggleFavorite}
          ref={recipesListRef}
          startIndex={startIndex}
        />

        {/* Условие для LoadMoreBtn (логика замены LoadMoreBtn на Pagination
        "Илья") */}

        {searchQuery || isFiltering ? (
          <div>
            {
              /*!searchQuery && */ page * recipesPerPage < totalItems &&
                !loading && <LoadMoreBtn onClick={loadMore} />
            }
          </div> /*
          recipes.length >= recipesPerPage &&
          !loading && <LoadMoreBtn onClick={loadMore} />*/
        ) : (
          <Pagination
            page={page}
            perPage={recipesPerPage}
            totalItems={totalItems}
            onPageChange={(newPage) => {
              setIsPagination(true); // Пагинация → перерисовка
              setStartIndex(0);
              setPage(newPage);
            }}
          />
        )}
      </section>
    </div>
  );
}
