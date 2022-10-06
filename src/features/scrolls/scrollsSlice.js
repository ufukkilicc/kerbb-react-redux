import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrolledPage: "",
  scrolledInWebsite: 0,
};

export const scrollsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateScrolledPage: (state, { payload }) => {
      state.scrolledPage = payload;
    },
    updateScrolledInWebsite: (state, { payload }) => {
      state.scrolledInWebsite = payload;
    },
  },
});
export const { updateScrolledPage } = scrollsSlice.actions;
export const getScrolledPage = (state) => state.scrolls.scrolledPage;

export default scrollsSlice.reducer;
