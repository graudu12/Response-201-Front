import { createSlice } from "@reduxjs/toolkit";

import {
  fetchContacts,
  addContact,
  deleteContact,
  patchContact,
} from "./operations";

import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: false,
    editing: {},
  },
  reducers: {
    startEditing: (state, action) => {
      state.editing[action.payload.id] = true;
    },
    stopEditing: (state, action) => {
      state.editing[action.payload.id] = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(patchContact.pending, handlePending)
      .addCase(patchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const { id } = action.payload;
        const index = state.items.findIndex((contact) => contact.id === id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.editing[id] = false;
      })
      .addCase(patchContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = false;
        state.loading = false;
      });
  },
});

export const { startEditing, stopEditing } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
