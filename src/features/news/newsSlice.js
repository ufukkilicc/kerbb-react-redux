import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  newsOne: {},
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, { payload }) => {
      state.news = payload;
    },
    includeNews: (state, { payload }) => {
      payload.map((newsObject) => {
        state.news.push(newsObject);
      });
    },
    addOneNews: (state, { payload }) => {
      state.newsOne = payload;
    },
  },
});
export const { addNews, addOneNews, includeNews } = newsSlice.actions;
export const getAllNews = (state) => state.news.news;
export const getOneNews = (state) => state.news.newsOne;

export default newsSlice.reducer;
