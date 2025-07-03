//src/redux/recipes/selectors.js
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectRecipes = (state) => state.recipes.items || [];
export const selectLoading = (state) => state.recipes.loading;
export const selectError = (state) => state.recipes.error;
export const selectNotFound = (state) => state.recipes.notFound;

export const selectFavoriteRecipes = (state) =>
  state.recipes.items.filter((recipe) => recipe.isFavorite);

export const selectRecipeById = (id) => (state) =>
  state.recipes.items.find((recipe) => recipe._id === id);

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectNameFilter],
  (recipes, nameFilter) => {
    return recipes.filter((recipe) =>
      recipe.nameRecipe.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);

