import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobsSlice";
import companyReducer from "../features/companies/companiesSlice";
import newsReducer from "../features/news/newsSlice";
import newsSlice from "../features/news/newsSlice";
import totalSlice from "../features/total/totalSlice";
import authSlice from "../features/auth/authSlice";
import snackBarSlice from "../features/snackbar/snackbarSlice";
import dialogsSlice from "../features/dialogs/dialogsSlice";
import scrollsSlice from "../features/scrolls/scrollsSlice";
import routesSlice from "../features/routes/routesSlice";
import companyDetailSlice from "../features/companyDetail/companyDetailSlice";
import shareDrawerSlice from "../features/shareDrawer/shareDrawerSlice";
import shareDrawerJobSlice from "../features/shareDrawerJob/shareDrawerJobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    companies: companyReducer,
    news: newsSlice,
    totals: totalSlice,
    auth: authSlice,
    snackbar: snackBarSlice,
    dialogs: dialogsSlice,
    scrolls: scrollsSlice,
    routes: routesSlice,
    companyjobs: companyDetailSlice,
    sharedrawer: shareDrawerSlice,
    sharedrawerjob: shareDrawerJobSlice,
  },
});
