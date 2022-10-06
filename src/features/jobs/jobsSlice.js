import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  jobSearchObject: {
    sort_by: "date",
    sort: "ASC",
    date: "whole",
    query_text: "",
    location_query_text: "",
  },
  jobSettingsDropdown: "",
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
  },
});
export const {
  addJobs,
  includeJobs,
  updateJobSearchObject,
  updateJobSettingsDropdown,
} = jobsSlice.actions;
export const getAllJobs = (state) => state.jobs.jobs;
export const getJobSearchObject = (state) => state.jobs.jobSearchObject;
export const getJobSettingsDropdown = (state) => state.jobs.jobSettingsDropdown;

export default jobsSlice.reducer;
