//src/redux/recipes/slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipesByQuery,
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
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        if (action.payload.append) {
          
          state.items = [...state.items, ...action.payload.items];
        } else {
          
          state.items = action.payload.items;
        }
        state.totalItems = action.payload.totalItems;
        state.loading = false;
        state.notFound = action.payload.items.length === 0;
      })
      
  //     const recipes = action.payload.items;
  // if (action.payload.append) {
  //   state.items = [...state.items, ...recipes];
  // } else {
  //   state.items = recipes;
  // }

  // state.totalItems = action.payload.totalItems;
  // state.loading = false;
      // state.notFound = recipes.length === 0;
      
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchRecipesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })
      .addCase(fetchRecipesByQuery.fulfilled, (state, action) => {
         state.items = action.payload.items;
  state.totalItems = action.payload.totalItems;
  state.loading = false;
  state.notFound = action.payload.items.length === 0;
      })
      .addCase(fetchRecipesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

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

