// src/redux/recipes/operations.js.
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  добавила значения по умолчанию и обработка категорий/ингредиентов
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
      if (ingredient && typeof ingredient === "object") {
        params.ingredient = ingredient.name;
      } else if (ingredient) {
        params.ingredient = ingredient; // fallback если вдруг всё же строка
      }

      const response = await axios.get(
        "https://response-201-back.onrender.com/api/recipes",
        { params }
      );

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

// добавила новый способ поиска — локальная фильтрация после получения всех рецептов
export const fetchRecipesByQuery = createAsyncThunk(
  "recipes/fetchRecipesByQuery",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://response-201-back.onrender.com/api/recipes",
        {
          params: { page: 1, perPage: 500 },
        }
      );

      const filteredRecipes = response.data.data.enrichedRecipes.filter(
        (recipe) =>
          recipe.nameRecipe.toLowerCase().includes(query.toLowerCase())
      );

      return {
        items: filteredRecipes,
        append: false,
        totalItems: filteredRecipes.length,
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

      const url = `https://response-201-back.onrender.com/api/recipes/${recipeId}/favorites`;

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
  async ({ page = 1, perPage = 12, append = false } = {}, thunkAPI) => {
    try {
      const params = { page, perPage };

      const res = await axios.get(
        "https://response-201-back.onrender.com/api/recipes/myRecipes",
        { params }
      );

      return {
        totalItems: res.data.data.pagination.totalItems,
        items: res.data.data.recipes,
        append,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching my recipes");
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async ({ page = 1, perPage = 12, append = false } = {}, thunkAPI) => {
    try {
      const params = { page, perPage };

      const res = await axios.get(
        "https://response-201-back.onrender.com/api/recipes/favorites",
        { params }
      );
      console.log("append inside fetchFavoriteRecipes:", append);
      return {
        items: res.data.data.recipes,
        append,
        totalItems: res.data.data.pagination.totalItems,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching favorite recipes");
    }
  }
);
