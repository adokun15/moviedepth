import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {
      bgImgSrc: null,
      title: "",
      images: [],
      runtime: "",
      companies: [],
      countryOrigin: [],
      releasedDate: "",
      popularity: null,
      languages: [],
      status: "",
      tag: "",
      votes: null,
      id: "",
      favorite: null,
      rated: null,
      watchlist: null,
      averageVotes: null,
      genre: [],
      budget: null,
      revenue: null,
      description: "",
      homepage: "",
    },
    isLoading: true,
    error: { error: false, message: "" },
  },
  reducers: {
    movieData(state, action) {
      state.movie = { ...action.payload };
      state.error = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.movie = {};
      state.error = { ...action.payload };
    },

    updateFavouriteMovie(state, action) {
      state.movie.favorite = action.payload;
    },

    updateWatchListMovie(state, action) {
      state.movie.watchlist = action.payload;
    },

    UpdateMovieRatings(state, action) {
      state.movie.rated = action.payload;
    },
    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const MovieAction = MovieSlice.actions;
