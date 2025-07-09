// export const selectLoggedIn = (state) => state.auth.isLoggedIn;

// export const selectUser = (state) => state.auth.user;

// export const selectRefreshing = (state) => state.auth.isRefreshing;

// export const selectLoading = (state) => state.auth.loading;

// export const selectError = (state) => state.auth.error;

// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// src/redux/auth/selectors.js
const EMPTY_ARRAY = [];

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectFavoriteRecipes = (state) => {
  const recipes = state.auth.user?.favoriteRecipes;
  return Array.isArray(recipes) ? recipes : EMPTY_ARRAY;
};

export const selectUser = (state) => state.auth.user;

export const selectRefreshing = (state) => state.auth.isRefreshing;

export const selectLoading = (state) => state.auth.loading;

export const selectError = (state) => state.auth.error;

export const selectLoggedIn = selectIsLoggedIn;
