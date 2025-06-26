import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // или recipes
  favorites: [], // если нужно
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavoriteRecipe: (state, action) => {
      const { id, add } = action.payload;
      const recipe = state.items.find((r) => r.id === id);
      if (recipe) {
        recipe.isFavorite = add;
      }
    },
     setRecipes: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { toggleFavoriteRecipe, setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
