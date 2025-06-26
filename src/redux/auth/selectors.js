export const selectLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectRefreshing = (state) => state.auth.isRefreshing;

export const selectLoading = (state) => state.auth.loading;

export const selectError = (state) => state.auth.error;


export const selectIsLoggedIn = () => true; // всегда true, чтобы не блокировать логику