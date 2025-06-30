// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchRecipes,
//   toggleFavoriteRecipeAsync,
//   fetchRecipeById,
// } from "./operations";

// const recipesSlice = createSlice({
//   name: "recipes",
//   initialState: {
//     items: [],
//     favorites: [],
//     currentRecipe: null,
//     loading: false,
//     error: null,
//     totalItems: 0,
//   },
//   reducers: {
//     toggleFavoriteRecipe: (state, action) => {
//       const { id, add } = action.payload;
//       const recipe = state.items.find((r) => r._id === id);
//       if (recipe) {
//         recipe.isFavorite = add;
//       }
//     },
//     setRecipes: (state, action) => {
//       state.items = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRecipes.fulfilled, (state, action) => {
//         state.items = [...state.items, ...action.payload.data.enrichedRecipes];
//         state.totalItems = action.payload.data.totalItems;
//       })
//       .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
//         const { id, add } = action.payload;
//         const recipe = state.items.find((r) => r._id === id);
//         if (recipe) {
//           recipe.isFavorite = add;
//         }
//       })
//       .addCase(fetchRecipeById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.currentRecipe = null;
//       })
//       .addCase(fetchRecipeById.fulfilled, (state, action) => {
//         console.log("📦 Reducer получил рецепт:", action.payload);
//         state.loading = false;
//         state.currentRecipe = action.payload;
//       })
//       .addCase(fetchRecipeById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Ошибка при загрузке рецепта";
//       });
//   },
// });

// export const { toggleFavoriteRecipe, setRecipes } = recipesSlice.actions;

// export const recipesReducer = recipesSlice.reducer;


//src/redux/recipes/slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipesByQuery,
  toggleFavoriteRecipeAsync,
} from "./operations";

const initialState = {
  items: [],
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
        state.items = action.payload;
        state.loading = false;
        state.notFound = action.payload.length === 0;
      })
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
        state.items = action.payload;
        state.loading = false;
        state.notFound = action.payload.length === 0;
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