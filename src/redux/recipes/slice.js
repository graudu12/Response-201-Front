import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipesByQuery,
  fetchOwnRecipes,
  fetchFavoriteRecipes,
  toggleFavoriteRecipeAsync,
} from "./operations";

const initialState = {
  items: [],
  totalItems: 0,
  favorites: [],
  searchQuery: "",
  loading: false,
  error: null,
  notFound: false,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    toggleFavoriteRecipe: (state, action) => {
      const { id, add } = action.payload;
      const recipe = state.items.find((r) => r._id === id);
      if (recipe) {
        recipe.isFavorite = add;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearNotFound: (state) => {
      state.notFound = false;
    },
  },
  extraReducers: (builder) => {
    // 🟢 Усі рецепти
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { items, totalItems, append } = action.payload;
        state.items = append ? [...state.items, ...items] : items;
        state.totalItems = totalItems;
        state.loading = false;
        state.notFound = items.length === 0;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟠 Пошук рецептів
      .addCase(fetchRecipesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })
      .addCase(fetchRecipesByQuery.fulfilled, (state, action) => {
        const { items, totalItems } = action.payload;
        state.items = items;
        state.totalItems = totalItems;
        state.loading = false;
        state.notFound = items.length === 0;
      })
      .addCase(fetchRecipesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔵 Власні рецепти
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        const { items, totalItems, append } = action.payload;
        state.items = append ? [...state.items, ...items] : items;
        state.totalItems = totalItems;
        state.loading = false;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟣 Улюблені рецепти
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        const { items, totalItems, append } = action.payload;
        state.items = append ? [...state.items, ...items] : items;
        state.totalItems = totalItems;
        state.loading = false;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 💛 Toggle favorite
      .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
        const { id, add } = action.payload;
        const recipe = state.items.find((r) => r._id === id);
        if (recipe) {
          recipe.isFavorite = add;
        }
      });
  },
});

export const { toggleFavoriteRecipe, setSearchQuery, clearNotFound } =
  recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
