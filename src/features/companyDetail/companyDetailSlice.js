import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyDetailJobs: [],
  companyDetailJobsSearchObject: {
    sort_by: "date",
    sort: "ASC",
    date: "whole",
    what: "",
    where: "",
  },
  companyDetailSettingsDropdown: false,
  companyDetailThemeColor: "",
};

export const companyDetailSlice = createSlice({
  name: "companyjobs",
  initialState,
  reducers: {
    addCompanyDetailJobs: (state, { payload }) => {
      state.companyDetailJobs = payload;
    },
    includeCompanyDetailJobs: (state, { payload }) => {
      payload.map((job) => {
        state.companyDetailJobs.push(job);
      });
    },
    updateCompanyDetailJobSearchObject: (state, { payload }) => {
      state.companyDetailJobsSearchObject = payload;
    },
    updateCompanyDetailSettingsDropdown: (state, { payload }) => {
      state.companyDetailSettingsDropdown = payload;
    },
    updateCompanyDetailThemeColor: (state, { payload }) => {
      state.companyDetailThemeColor = payload;
    },
  },
});
export const {
  addCompanyDetailJobs,
  includeCompanyDetailJobs,
  updateCompanyDetailJobSearchObject,
  updateCompanyDetailSettingsDropdown,
  updateCompanyDetailThemeColor,
} = companyDetailSlice.actions;
export const getAllCompanyDetailJobs = (state) =>
  state.companyjobs.companyDetailJobs;
export const getCompanyDetailJobSearchObject = (state) =>
  state.companyjobs.companyDetailJobsSearchObject;
export const getCompanyDetailSettingsDropdown = (state) =>
  state.companyjobs.companyDetailSettingsDropdown;
export const getCompanyDetailThemeColor = (state) =>
  state.companyjobs.companyDetailThemeColor;

export default companyDetailSlice.reducer;
