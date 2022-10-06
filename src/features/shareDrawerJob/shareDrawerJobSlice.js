import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  shareDrawerJob: {},
  shareJobOpen: false,
  shareJobMobileOpen: false,
};

export const shareDrawerJobSlice = createSlice({
  name: "sharedrawerjob",
  initialState,
  reducers: {
    updateShareDrawerJob: (state, { payload }) => {
      state.shareDrawerJob = payload;
    },
    updateShareJobOpen: (state, { payload }) => {
      state.shareJobOpen = payload;
    },
    updateShareJobMobileOpen: (state, { payload }) => {
      state.shareJobMobileOpen = payload;
    },
  },
});
export const {
  updateShareDrawerJob,
  updateShareJobOpen,
  updateShareJobMobileOpen,
} = shareDrawerJobSlice.actions;
export const getShareDrawerJob = (state) => state.sharedrawerjob.shareDrawerJob;
export const getShareJobOpen = (state) => state.sharedrawerjob.shareJobOpen;
export const getShareJobMobileOpen = (state) =>
  state.sharedrawerjob.shareJobMobileOpen;

export default shareDrawerJobSlice.reducer;
