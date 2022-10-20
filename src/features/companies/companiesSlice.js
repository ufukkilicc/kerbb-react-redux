import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  company: {},
  companiesSearchObject: {
    page: 1,
    size: 10,
  },
  elementsLoading: false,
  companiesCount: 0,
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompanies: (state, { payload }) => {
      state.companies = payload;
    },
    includeCompanies: (state, { payload }) => {
      payload.map((company) => {
        state.companies.push(company);
      });
    },
    addCompany: (state, { payload }) => {
      state.company = payload;
    },
    updateElementsLoadingCompany: (state, { payload }) => {
      state.elementsLoading = payload;
    },
    updateCompaniesCount: (state, { payload }) => {
      state.companiesCount = payload;
    },
    updateCompaniesSearchObject: (state, { payload }) => {
      state.companiesSearchObject = payload;
    },
  },
});
export const {
  addCompanies,
  addCompany,
  includeCompanies,
  updateElementsLoadingCompany,
  updateCompaniesCount,
  updateCompaniesSearchObject,
} = companiesSlice.actions;
export const getCompany = (state) => state.companies.company;
export const getAllCompanies = (state) => state.companies.companies;
export const getElementsLoadingCompany = (state) =>
  state.companies.elementsLoading;
export const getCompaniesCount = (state) => state.companies.companiesCount;
export const getCompaniesSearchObject = (state) =>
  state.companies.companiesSearchObject;

export default companiesSlice.reducer;
