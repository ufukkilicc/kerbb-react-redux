import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  company: {},
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompanies: (state, { payload }) => {
      state.companies = payload;
    },
    includeCompanies: (state, { payload }) => {
      console.log("aa");
      payload.map((company) => {
        state.companies.push(company);
      });
    },
    addCompany: (state, { payload }) => {
      state.company = payload;
    },
  },
});
export const { addCompanies, addCompany, includeCompanies } =
  companiesSlice.actions;
export const getCompany = (state) => state.companies.company;
export const getAllCompanies = (state) => state.companies.companies;

export default companiesSlice.reducer;
