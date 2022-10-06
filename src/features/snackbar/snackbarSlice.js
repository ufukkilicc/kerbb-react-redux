import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: { open: false, type: "", message: "" },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    updateSnackBar: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});
export const { updateSnackBar } = snackbarSlice.actions;
export const getSnackBar = (state) => state.snackbar.snackbar;

export default snackbarSlice.reducer;
