import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await axios.get('http://localhost:4000/api/recipes');
    return response.data;
  }
);

export const toggleFavoriteRecipeAsync = createAsyncThunk(
  'recipes/toggleFavoriteAsync',
  async ({ id, add }) => {
    await axios.post(`http://localhost:4000/api/recipes/${id}/favorites`, { add });
    return { id, add };
  }
);
