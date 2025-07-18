//src/redux/auth/slice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { register, logIn, logOut, refreshUser } from "./operations";
// import { toggleFavoriteRecipeAsync } from "../recipes/operations";
// const handlePending = (state) => {
//   state.loading = true;
//   state.error = false;
// };

// const handleFulfilled = (state, action) => {
//   state.user = action.payload.user;
//   state.token = action.payload.accessToken;
//   state.isLoggedIn = true;
//   state.loading = false;
//   state.error = false;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: {
//       name: null,
//       email: null,
//       favoriteRecipes: [],
//     },
//     token: null,
//     isLoggedIn: false,
//     isRefreshing: false,
//     loading: false,
//     error: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, handlePending)
//       .addCase(register.fulfilled, handleFulfilled)
//       .addCase(register.rejected, handleRejected)

//       .addCase(logIn.pending, handlePending)
//       .addCase(logIn.fulfilled, handleFulfilled)
//       .addCase(logIn.rejected, handleRejected)

//       .addCase(logOut.pending, handlePending)
//       .addCase(logOut.fulfilled, (state) => {
//         state.user = { name: null, email: null };
//         state.token = null;
//         state.isLoggedIn = false;
//         state.loading = false;
//         state.error = false;
//       })
//       .addCase(logOut.rejected, handleRejected)

//       .addCase(refreshUser.pending, (state) => {
//         state.isRefreshing = true;
//         state.loading = true;
//         state.error = false;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//         state.loading = false;
//         state.error = false;
//       })
//       .addCase(refreshUser.rejected, (state, action) => {
//         state.isRefreshing = false;
//         state.loading = false;
//         state.error = action.payload || true;
//         state.isLoggedIn = false;
//         state.user = null;
//       })
//       .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
//         const { recipeId, add } = action.payload;
//         if (add) {
//           state.user.favoriteRecipes.push(recipeId);
//         } else {
//           state.user.favoriteRecipes = state.user.favoriteRecipes.filter(
//             (id) => id !== recipeId
//           );
//         }
//       });
//   },
// });

// export const authReducer = authSlice.reducer;

// src/redux/auth/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import { toggleFavoriteRecipeAsync } from "../recipes/operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
};

const handleFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.accessToken;
  state.isLoggedIn = true;
  state.loading = false;
  state.error = false;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      favoriteRecipes: [],
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleRejected)

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, handleFulfilled)
      .addCase(logIn.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, favoriteRecipes: [] };
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(logOut.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error = action.payload || true;
        state.isLoggedIn = false;
        state.user = null;
      })

      .addCase(toggleFavoriteRecipeAsync.fulfilled, (state, action) => {
        const { recipeId, add } = action.payload;

        if (add) {
          if (!state.user.favoriteRecipes.includes(recipeId)) {
            state.user.favoriteRecipes.push(recipeId);
          }
        } else {
          const newList = state.user.favoriteRecipes.filter(
            (id) => id !== recipeId
          );

          if (newList.length !== state.user.favoriteRecipes.length) {
            state.user.favoriteRecipes = newList;
          }
        }
      });
  },
});

export const authReducer = authSlice.reducer;
