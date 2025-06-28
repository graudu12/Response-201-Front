import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    changeFilter(state, action) {
      const { name } = action.payload;
      if (name !== undefined) {
        state.name = name;
      }
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;
