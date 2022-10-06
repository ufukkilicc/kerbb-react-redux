import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  shareDrawerCompany: {},
  shareOpen: false,
  shareMobileOpen: false,
};

export const shareDrawerSlice = createSlice({
  name: "sharedrawer",
  initialState,
  reducers: {
    updateShareDrawerCompany: (state, { payload }) => {
      state.shareDrawerCompany = payload;
    },
    updateShareOpen: (state, { payload }) => {
      state.shareOpen = payload;
    },
    updateShareMobileOpen: (state, { payload }) => {
      state.shareMobileOpen = payload;
    },
  },
});
export const {
  updateShareDrawerCompany,
  updateShareOpen,
  updateShareMobileOpen,
} = shareDrawerSlice.actions;
export const getShareDrawerCompany = (state) =>
  state.sharedrawer.shareDrawerCompany;
export const getShareOpen = (state) => state.sharedrawer.shareOpen;
export const getShareMobileOpen = (state) => state.sharedrawer.shareMobileOpen;

export default shareDrawerSlice.reducer;
