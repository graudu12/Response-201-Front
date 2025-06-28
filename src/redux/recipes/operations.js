import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/recipes");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "recipes/addContact",
  async (items, thunkAPI) => {
    try {
      const res = await axios.post("/recipes", items);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "recipes/deleteContact",
  async (itemId, thunkAPI) => {
    try {
      const res = await axios.delete(`/recipes/${itemId}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const patchContact = createAsyncThunk(
  "recipes/patchContact",
  async (updatedContact, thunkAPI) => {
    const { id, name, number } = updatedContact;
    try {
      const res = await axios.patch(`/recipes/${id}`, { name, number });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
