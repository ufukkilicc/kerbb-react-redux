import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoute: "",
};

export const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    updateCurrentRoute: (state, { payload }) => {
      state.currentRoute = payload;
    },
  },
});
export const { updateCurrentRoute } = routesSlice.actions;
export const getCurrentRoute = (state) => state.routes.currentRoute;

export default routesSlice.reducer;
