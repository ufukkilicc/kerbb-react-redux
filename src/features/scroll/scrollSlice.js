import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollHeight: 0,
};

export const scrollSlice = createSlice({
  name: "totals",
  initialState,
  reducers: {
    addTotal: (state, { payload }) => {
      state.totals = payload;
    },
  },
});
export const { addTotal } = scrollSlice.actions;
export const getTotal = (state) => state.totals.totals;

export default scrollSlice.reducer;
