import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    toggleGptView: false,
  },
  reducers: {
    toggleGpt: (state) => {
      state.toggleGptView = !state.toggleGptView;
    },
  },
});

export const { toggleGpt } = gptSlice.actions;

export default gptSlice.reducer;
