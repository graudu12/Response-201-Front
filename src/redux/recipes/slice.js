import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, toggleFavoriteRecipeAsync } from "./operations";

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    favorites: [],
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
 
  state.items = action.payload;
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

export const {
  toggleFavoriteRecipe,
  setRecipes,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
