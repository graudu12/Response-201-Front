//src / redux / recipes / operations.js;
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (
    {
      page = 1,
      perPage = 40,
      append = false,
      category = "",
      ingredient = "",
    } = {},
    thunkAPI
  ) => {
    try {
      const params = { page, perPage };
      if (category) params.category = category;
      if (ingredient) params.ingredient = ingredient;

      const response = await axios.get(
        "https://response-201-back.onrender.com/api/recipes",
        {
          params,
        }
      );

      console.log("Response from API:", response.data);

      return {
        items: response.data.data.enrichedRecipes,
        totalItems: response.data.data.totalItems,
        append,
      };
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
        `https://response-201-back.onrender.com/api/recipes?name=${encodeURIComponent(
          query
        )}`
      );

      return {
        items: response.data.data.enrichedRecipes || response.data.data || [],
        append: false,
        totalItems:
          response.data.data.totalItems || response.data.data?.length || 0,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при пошуку рецептів"
      );
    }
  }
);

export const toggleFavoriteRecipeAsync = createAsyncThunk(
  "recipes/toggleFavoriteAsync",
  async ({ recipeId, mode }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const favoriteIds = state.auth.user.favoriteRecipes;
      const isCurrentlyFavorite = favoriteIds.includes(recipeId);

      const url = `https://response-201-back.onrender.com/api/recipes/${recipeId}/favorites`; /* `http://localhost:3000/api/recipes/${recipeId}/favorites`;*/

      if (isCurrentlyFavorite) {
        await axios.delete(url);
      } else {
        await axios.patch(url);
      }
      return { recipeId, add: !isCurrentlyFavorite, mode };
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка при зміні улюблених рецептів");
    }
  }
);

export const fetchRecipesByIngredients = createAsyncThunk(
  "recipes/fetchRecipesByIngredients",
  async (ingredientQuery, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://response-201-back.onrender.com/api/recipes",
        {
          params: { names: ingredientQuery },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Помилка при пошуку рецептів за інгредієнтами"
      );
    }
  }
);
export const fetchMyRecipes = createAsyncThunk(
  "recipes/fetchMyRecipes",
  async ({ page = 1, perPage = 12 } = {}, thunkAPI) => {
    try {
      /*const reduxState = thunkAPI.getState();

      const token = reduxState.auth.token || localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      setAuthHeader(token); // встановлює Authorization в axios*/
      const params = { page, perPage };
      const res = await axios.get(
        "https://response-201-back.onrender.com/api/recipes/myRecipes",
        { params }
      );
      console.log("MY RECIPES RESPONSE:", res.data);
      return {
        totalItems: res.data.data.pagination.totalItems,
        items: res.data.data.recipes,
        append: false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching my recipes");
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async ({ page = 1, perPage = 12 } = {}, thunkAPI) => {
    try {
      const params = { page, perPage };
      const res = await axios.get(
        "https://response-201-back.onrender.com/api/recipes/favorites",
        { params }
      );
      console.log("MY RECIPES RESPONSE:", res.data);
      return {
        items: res.data.data.recipes,
        append: false,
        totalItems: res.data.data.pagination.totalItems,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching favorite recipes");
    }
  }
);
