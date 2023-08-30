import { createSlice } from "@reduxjs/toolkit";

export const Series = createSlice({
  name: "series",
  initialState: {
    series: [],
    isLoading: true,
    error: { error: false, message: "" },
  },
  reducers: {
    seriesData(state, data) {
      state.series = [...data.payload];
      state.error = { error: false, message: "" };
    },
    loadingHandler(state, action) {
      state.isLoading = action.payload;
    },

    errorHandler(state, action) {
      state.error = { ...action.payload };
      state.series = [];
    },
  },
});
export const SeriesAction = Series.actions;
