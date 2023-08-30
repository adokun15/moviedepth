import { createSlice } from "@reduxjs/toolkit";

export const CastSlice = createSlice({
  name: "cast",
  initialState: {
    cast: {},
    isLoading: true,
    error: { error: false, message: "" },
  },
  reducers: {
    CastData(state, action) {
      state.cast = { ...action.payload };
      state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.cast = {};
      state.error = { ...action.payload };
    },

    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const CastAction = CastSlice.actions;
