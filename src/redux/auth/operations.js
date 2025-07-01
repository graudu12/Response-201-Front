import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://response-201-back.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", newUser);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      if (
        e.response &&
        e.response.status === 409 &&
        e.response.data?.message?.includes("email")
      ) {
        return thunkAPI.rejectWithValue("This email is already in use.");
      }

      return thunkAPI.rejectWithValue(e.message || "Registration failed.");
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const persistedToken = reduxState.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    setAuthHeader(persistedToken);

    const res = await axios.get("/auth/refresh");
    return res.data;
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
