import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSearchHistory: [],
  searchObject: { what: "", where: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserSearchHistory: (state, { payload }) => {
      state.userSearchHistory = payload;
    },
    updateSearchObject: (state, { payload }) => {
      state.searchObject = payload;
    },
  },
});
export const { updateUserSearchHistory, updateSearchObject } =
  authSlice.actions;
export const getUserSearchHistory = (state) => state.auth.userSearchHistory;
export const getSearchObject = (state) => state.auth.searchObject;

export default authSlice.reducer;
