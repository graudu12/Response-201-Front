// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchRecipes = createAsyncThunk(
//   "recipes/fetchRecipes",
//   async ({ page, perPage }) => {
//     const response = await axios.get(
//       `http://localhost:4000/api/recipes?page=${page}&perPage=${perPage}`
//     );
//     return response.data;

//     /*"recipes/fetchRecipes",
//   async ({ page = 1, perPage = 40 } = {}) => {
//     const response = await axios.get(
//       `http://localhost:4000/api/recipes?page=${page}&perPage=${perPage}`
//     );
//     return response.data.data.enrichedRecipes;*/
//   }
// );

// export const fetchRecipeById = createAsyncThunk(
//   "recipes/fetchRecipeById",
//   async (id, thunkAPI) => {
//     try {
//       console.log("📡 Отправка запроса на рецепт по ID:", id); // <-- ВСТАВЬ СЮДА
//       const response = await axios.get(`/api/recipes/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const toggleFavoriteRecipeAsync = createAsyncThunk(
//   "recipes/toggleFavoriteAsync",
//   async ({ id, add }) => {
//     await axios.post(`http://localhost:4000/api/recipes/${id}/favorites`, {
//       add,
//     });
//     return { id, add };
//   }
// );

//src/redux/recipes/operations.js
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

      const response = await axios.get("http://localhost:4000/api/recipes", {
        params,
      });

      console.log("Response from API:", response.data); // <-- Вот здесь

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
        `http://localhost:4000/api/recipes?name=${encodeURIComponent(query)}`
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
  async (recipeId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const favoriteIds = state.auth.user.favoriteRecipes;
      const isCurrentlyFavorite = favoriteIds.includes(recipeId);

      const url = `http://localhost:4000/api/recipes/${recipeId}/favorites`;
      if (isCurrentlyFavorite) {
        await axios.delete(url);
      } else {
        await axios.patch(url);
      }
      return { recipeId, add: !isCurrentlyFavorite };
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка при зміні улюблених рецептів");
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
