import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
  fetchRecipeById,
} from "./operations";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    favorites: [],
    currentRecipe: null,
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavoriteRecipe: (state, action) => {
      const { id, add } = action.payload;
      const recipe = state.items.find((r) => r._id === id);
      if (recipe) {
        recipe.isFavorite = add;
      }
    },
    setRecipes: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
        const { id, add } = action.payload;
        const recipe = state.items.find((r) => r._id === id);
        if (recipe) {
          recipe.isFavorite = add;
        }
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentRecipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        console.log("📦 Reducer получил рецепт:", action.payload);
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке рецепта";
      });
  },
});

export const { toggleFavoriteRecipe, setRecipes } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
