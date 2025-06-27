import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk для загрузки рецептов с сервера
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('http://localhost:4000/api/recipes');
  return response.data;
});

// Async thunk для переключения избранного на сервере
export const toggleFavoriteRecipeAsync = createAsyncThunk(
  'recipes/toggleFavoriteAsync',
  async ({ id, add }) => {
    await axios.post(`http://localhost:4000/api/recipes/${id}/favorites`, { add });
    return { id, add };
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
        const { id, add } = action.payload;
        const recipe = state.items.find((r) => r.id === id);
        if (recipe) {
          recipe.isFavorite = add;
        }
      });
  },
});

export const { toggleFavoriteRecipe, setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;

