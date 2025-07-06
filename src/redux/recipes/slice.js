//src/redux/recipes/slice.js
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchRecipes,
//   fetchRecipesByQuery,
//   toggleFavoriteRecipeAsync,
//   fetchMyRecipes,
//   fetchFavoriteRecipes,
// } from "./operations";

// const initialState = {
//   items: [],
//   totalItems: 0,
//   favorites: [],
//   myRecipes: [],
//   searchQuery: "",
//   loading: false,
//   error: null,
//   notFound: false,
// };

// const recipesSlice = createSlice({
//   name: "recipes",
//   initialState,
//   reducers: {
//     toggleFavoriteRecipe: (state, action) => {
//       const { id, add } = action.payload;
//       const recipe = state.items.find((r) => r._id === id);
//       if (recipe) {
//         recipe.isFavorite = add;
//       }
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     clearNotFound: (state) => {
//       state.notFound = false;
//     },
//     addNewRecipe: (state, action) => {
//       state.items.unshift(action.payload);
//       state.myRecipes.unshift(action.payload);
//       state.totalItems += 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.notFound = false;
//       })
//       .addCase(fetchRecipes.fulfilled, (state, action) => {
//         if (action.payload.append) {
//           state.items = [...state.items, ...action.payload.items];
//         } else {
//           state.items = action.payload.items;
//         }
//         state.totalItems = action.payload.totalItems;
//         state.loading = false;
//         state.notFound = action.payload.items.length === 0;
//       })

//       //     const recipes = action.payload.items;
//       // if (action.payload.append) {
//       //   state.items = [...state.items, ...recipes];
//       // } else {
//       //   state.items = recipes;
//       // }

//       // state.totalItems = action.payload.totalItems;
//       // state.loading = false;
//       // state.notFound = recipes.length === 0;

//       .addCase(fetchRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       .addCase(fetchRecipesByQuery.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.notFound = false;
//       })
//       .addCase(fetchRecipesByQuery.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = action.payload.totalItems;
//         state.loading = false;
//         state.notFound = action.payload.items.length === 0;
//       })
//       .addCase(fetchRecipesByQuery.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
//         const { recipeId, add, mode } = action.payload;
//         if (mode === "favorites" && !add) {
//           // Якщо ми в режимі "favorites" і юзер видалив рецепт з улюблених — видаляємо зі списку
//           state.items = state.items.filter((recipe) => recipe._id !== recipeId);
//           state.totalItems -= 1;
//         } else {
//           const recipe = state.items.find((r) => r._id === recipeId);
//           if (recipe) {
//             recipe.isFavorite = add;
//           }
//         }
//       })
//       .addCase(fetchMyRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyRecipes.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = action.payload.totalItems;
//         state.loading = false;
//       })
//       .addCase(fetchMyRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchFavoriteRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = action.payload.totalItems;
//         state.loading = false;
//       })
//       .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   toggleFavoriteRecipe,
//   setSearchQuery,
//   clearNotFound,
//   addNewRecipe,
// } = recipesSlice.actions;

// export const recipesReducer = recipesSlice.reducer;


//src/redux/recipes/slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipesByQuery,
  toggleFavoriteRecipeAsync,
  fetchMyRecipes,
  fetchFavoriteRecipes,
} from "./operations";

const initialState = {
  items: [],
  totalItems: 0,
  favorites: [], 
  myRecipes: [], 
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
    addNewRecipe: (state, action) => {
      state.items.unshift(action.payload);
      state.myRecipes.unshift(action.payload);
      state.totalItems += 1;
    },
    clearRecipes: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.notFound = false;
      state.error = null;
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
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      })

      .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
        const { recipeId, add, mode } = action.payload;
        if (mode === "favorites" && !add) {
          state.items = state.items.filter((recipe) => recipe._id !== recipeId);
          state.totalItems -= 1;
        } else {
          const recipe = state.items.find((r) => r._id === recipeId);
          if (recipe) {
            recipe.isFavorite = add;
          }
        }
      })

      .addCase(fetchMyRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchMyRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  toggleFavoriteRecipe,
  setSearchQuery,
  clearNotFound,
  addNewRecipe,
  clearRecipes,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;

