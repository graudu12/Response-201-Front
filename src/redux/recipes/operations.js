// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchRecipes = createAsyncThunk(
//   'recipes/fetchRecipes',
//   async ({ page = 1, perPage = 40 } = {}) => {
//     const response = await axios.get(`http://localhost:4000/api/recipes?page=${page}&perPage=${perPage}`);
//     return response.data.data.enrichedRecipes;
//   }
// );

// export const toggleFavoriteRecipeAsync = createAsyncThunk(
//   'recipes/toggleFavoriteAsync',
//   async ({ id, add }) => {
//     await axios.post(`http://localhost:4000/api/recipes/${id}/favorites`, { add });
//     return { id, add };
//   }
// );

//src/redux/recipes/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ page = 1, perPage = 40 } = {}, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recipes?page=${page}&perPage=${perPage}`
      );
      return response.data.data.enrichedRecipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при завантаженні рецептів"
      );
    }
  }
);

export const fetchRecipesByQuery = createAsyncThunk(
  "recipes/fetchRecipesByQuery",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recipes?name=${encodeURIComponent(query)}`
      );
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при пошуку рецептів"
      );
    }
  }
);

export const toggleFavoriteRecipeAsync = createAsyncThunk(
  "recipes/toggleFavoriteAsync",
  async ({ id, add }, thunkAPI) => {
    try {
      await axios.post(`http://localhost:4000/api/recipes/${id}/favorites`, {
        add,
      });
      return { id, add };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при зміні улюблених рецептів"
      );
    }
  }
);

export const fetchRecipesByIngredients = createAsyncThunk(
  "recipes/fetchRecipesByIngredients",
  async (ingredientQuery, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/api/recipes", {
        params: { names: ingredientQuery },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Помилка при пошуку рецептів за інгредієнтами"
      );
    }
  }
);
