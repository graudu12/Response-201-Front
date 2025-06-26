import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: { name: "", number: "" },
  reducers: {
    changeFilter(state, action) {
      const { name, number } = action.payload;
      if (name !== undefined) {
        state.name = name;
      }
      if (number !== undefined) {
        state.number = number;
      }
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;
