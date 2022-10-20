import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  jobSearchObject: {
    page: 1,
    size: 20,
    sort_by: "date",
    sort: "DESC",
    date: "whole",
    what: "",
    where: "",
  },
  jobSettingsDropdown: "",
  elementsLoading: false,
  jobsCount: 0,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJobs: (state, { payload }) => {
      state.jobs = payload;
    },
    includeJobs: (state, { payload }) => {
      payload.map((job) => {
        state.jobs.push(job);
      });
    },
    updateJobSearchObject: (state, { payload }) => {
      state.jobSearchObject = payload;
    },
    updateJobSettingsDropdown: (state, { payload }) => {
      state.jobSettingsDropdown = payload;
    },
    updateElementsLoading: (state, { payload }) => {
      state.elementsLoading = payload;
    },
    updateJobsCount: (state, { payload }) => {
      state.jobsCount = payload;
    },
  },
});
export const {
  addJobs,
  includeJobs,
  updateJobSearchObject,
  updateJobSettingsDropdown,
  updateElementsLoading,
  updateJobsCount,
} = jobsSlice.actions;
export const getAllJobs = (state) => state.jobs.jobs;
export const getJobSearchObject = (state) => state.jobs.jobSearchObject;
export const getJobSettingsDropdown = (state) => state.jobs.jobSettingsDropdown;
export const getElementsLoading = (state) => state.jobs.elementsLoading;
export const getJobsCount = (state) => state.jobs.jobsCount;

export default jobsSlice.reducer;
