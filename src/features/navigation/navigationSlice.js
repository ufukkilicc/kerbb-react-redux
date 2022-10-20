import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileNaviObject: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    updateMobileNaviObject: (state, { payload }) => {
      state.mobileNaviObject = payload;
    },
  },
});
export const { updateMobileNaviObject } = navigationSlice.actions;
export const getMobileNaviObject = (state) => state.navigation.mobileNaviObject;

export default navigationSlice.reducer;
