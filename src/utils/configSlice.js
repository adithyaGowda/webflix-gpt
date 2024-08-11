import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    selectLanguage: "en",
  },
  reducers: {
    changeDefaultLanguage: (state, action) => {
      state.selectLanguage = action.payload;
    },
  },
});

export const { changeDefaultLanguage } = configSlice.actions;

export default configSlice.reducer;
