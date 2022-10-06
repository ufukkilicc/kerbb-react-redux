import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: false,
  mobileDialog: false,
  companyDialog: false,
  companyMobileDialog: false,
};

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    updateDialog: (state, { payload }) => {
      state.dialog = payload;
    },
    updateMobileDialog: (state, { payload }) => {
      state.mobileDialog = payload;
    },
    updateCompanyDialog: (state, { payload }) => {
      state.companyDialog = payload;
    },
    updateCompanyMobileDialog: (state, { payload }) => {
      state.companyMobileDialog = payload;
    },
  },
});
export const {
  updateDialog,
  updateMobileDialog,
  updateCompanyDialog,
  updateCompanyMobileDialog,
} = dialogsSlice.actions;
export const getDialog = (state) => state.dialogs.dialog;
export const getMobileDialog = (state) => state.dialogs.mobileDialog;
export const getCompanyDialog = (state) => state.dialogs.companyDialog;
export const getCompanyMobileDialog = (state) =>
  state.dialogs.companyMobileDialog;

export default dialogsSlice.reducer;
