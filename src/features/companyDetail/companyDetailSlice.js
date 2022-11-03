import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyDetailObject: null,
  companyDetailJobs: [],
  companyDetailJobsSearchObject: {
    page: 1,
    size: 20,
    sort_by: "date",
    sort: "ASC",
    date: "whole",
    what: "",
    where: "",
    company: "",
  },
  companyDetailSettingsDropdown: false,
  companyDetailThemeColor: "",
  companyDetailElementsLoading: false,
};

export const companyDetailSlice = createSlice({
  name: "companyjobs",
  initialState,
  reducers: {
    addCompanyDetailObject: (state, { payload }) => {
      state.companyDetailObject = payload;
    },
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
    updateCompanyDetailElementsLoading: (state, { payload }) => {
      state.companyDetailElementsLoading = payload;
    },
  },
});
export const {
  addCompanyDetailJobs,
  includeCompanyDetailJobs,
  updateCompanyDetailJobSearchObject,
  updateCompanyDetailSettingsDropdown,
  updateCompanyDetailThemeColor,
  updateCompanyDetailElementsLoading,
  addCompanyDetailObject,
} = companyDetailSlice.actions;
export const getAllCompanyDetailJobs = (state) =>
  state.companyjobs.companyDetailJobs;
export const getCompanyDetailJobSearchObject = (state) =>
  state.companyjobs.companyDetailJobsSearchObject;
export const getCompanyDetailSettingsDropdown = (state) =>
  state.companyjobs.companyDetailSettingsDropdown;
export const getCompanyDetailThemeColor = (state) =>
  state.companyjobs.companyDetailThemeColor;
export const getCompanyDetailElementsLoading = (state) =>
  state.companyjobs.companyDetailElementsLoading;
export const getCompanyDetailObject = (state) =>
  state.companyjobs.companyDetailObject;

export default companyDetailSlice.reducer;
