import { createSlice } from "@reduxjs/toolkit";

export const MoviesSlice = createSlice({
  name: "moviesSlice",
  initialState: {
    movies: [],
    error: { error: false, message: "" },
    isLoading: true,
  },
  reducers: {
    addMovie(state, action) {
      state.movies = [...action.payload];
      state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.movies = [];
      state.error = { ...action.payload };
    },

    loaderHandler(state, action) {
      state.isLoading = action.payload;
      // if (action.payload) {
      //   state.movies = [];
      //} else {
      // state.movies = [...state.movies];
      //}
    },
  },
});

export const MoviesAction = MoviesSlice.actions;
