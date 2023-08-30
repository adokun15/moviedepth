import { createSlice } from "@reduxjs/toolkit";

export const FilmSlice = createSlice({
  name: "film",
  initialState: {
    films: [],
    isLoading: true,
    error: { message: "", error: false },
  },
  reducers: {
    filmData(state, action) {
      state.films = [...action.payload];
      state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.movies = [];
      state.error = { ...action.payload };
    },

    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const FilmAction = FilmSlice.actions;
