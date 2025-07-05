import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
  /*"http://localhost:3000";*/ "https://response-201-back.onrender.com/api";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "/auth/register",
  async (newUser, thunkAPI) => {
    try {
      await axios.post("/auth/register", newUser);

      const loginResponse = await axios.post("/auth/login", {
        email: newUser.email,
        password: newUser.password,
      });

      const accessToken = loginResponse.data.data.accessToken;
      setAuthHeader(accessToken);
      localStorage.setItem("token", accessToken);

      const currentUserResponse = await axios.get("/user/current");
      //const currentUserResponse = await axios.get("/auth/refresh");

      return { user: currentUserResponse.data, accessToken };
    } catch (e) {
      if (
        e.response &&
        e.response.status === 409 &&
        e.response.data?.message?.includes("email")
      ) {
        return thunkAPI.rejectWithValue("This email is already in use.");
      }

      return thunkAPI.rejectWithValue(
        e.response.data.message || "Registration failed"
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "/auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      const accessToken = res.data.data.accessToken;
      setAuthHeader(accessToken);
      localStorage.setItem("token", accessToken);
      const userRes = await axios.get("/user/current");
      //const userRes = await axios.get("/auth/refresh");
      return { accessToken, user: userRes.data || null };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response.data.message || "Login failed"
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
    localStorage.removeItem("token");
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const persistedToken =
        reduxState.auth.token || localStorage.getItem("token");

      if (!persistedToken) {
        return thunkAPI.rejectWithValue("No token found");
      }
      setAuthHeader(persistedToken);

      //const res = await axios.get("/auth/refresh");
      const res = await axios.get("/user/current");
      return res.data.data;
    } catch (error) {
      /*{
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }*/
      return thunkAPI.rejectWithValue("Unable to fetch current user");
    }
  }
);
