import { createSlice } from "@reduxjs/toolkit";

export const OtherSlice = createSlice({
  name: "other",
  initialState: {
    data: [],
    lastPage: 0,
    page: 2,
    isLoading: true,
    error: { error: false, message: "" },
  },
  reducers: {
    newData(state, action) {
      state.data = [...action.payload.data];
      state.page = action.payload.currentPage;
      state.lastPage = action.payload.lastPage;
      state.error = { error: false, message: "" };
      ///state.loader = false;
    },
    loadingHandler(state, action) {
      const loader = action.payload;

      state.isLoading = loader;
      //if (!loader) return;
      //state.data = [];
      //state.page = 1;
      //state.lastPage = 1;
      // state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.data = [];
      state.error = { ...action.payload };
      //if (action.payload.error) {
      // state.page = 1;
      //state.lastPage = 1;
      //state.isLoading = false;
      // }
    },
  },
});

export const OtherAction = OtherSlice.actions;
