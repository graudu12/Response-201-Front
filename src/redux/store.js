import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/slice";
import filtersReducer from "./filters/slice";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";
import recipesReducer from './recipesSlice/recipesSlice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const persistedContactsReducer = persistReducer(
  {
    key: "contactsValue",
    storage,
    whitelist: ["items"],
  },
  contactsReducer
);

const persistedAuthReducer = persistReducer(
  {
    key: "auth",
    storage,
    whitelist: ["token"],
  },
  authReducer
);


export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
    auth: persistedAuthReducer,
    recipes: recipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
