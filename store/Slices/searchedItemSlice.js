import { createSlice } from "@reduxjs/toolkit";

export const SearchedSlice = createSlice({
  name: "SearchedSlice",
  initialState: {
    list: { query: "", list: [], currentpage: 1, lastPage: 2 },
    error: { error: false, message: "" },
    isLoading: false,
  },
  reducers: {
    addList(state, action) {
      state.list = { ...action.payload };
      state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.list = { query: "", list: [], currentpage: null, lastPage: null };
      state.error = { ...action.payload };
    },

    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const SearchAction = SearchedSlice.actions;
