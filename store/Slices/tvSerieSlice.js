import { createSlice } from "@reduxjs/toolkit";

export const Serie = createSlice({
  name: "series",
  initialState: {
    singleData: {
      serieId: null,
      favorite: null,
      watchlist: null,
      rated: null,
      creators: [],
      bgImgSrc: "",
      runtime: null,
      firstAirDate: "",
      lastAirDate: "",
      genre: [],
      InProduction: null,
      totalSeasons: null,
      totalEpisodes: null,
      networks: [],
      images: [],
      serieOrigins: [],
      language: "",
      title: "",
      description: "",
      popularity: "",
      companies: [],
      countries: [],
      seasons: [],
      status: null,
      averageVotes: null,
      votes: null,
      tag: "",
    },
    seasons: [],
    season: {
      airDate: "",
      serieNumber: null,
      serieId: null,
      averageVote: null,
      seasonImgSrc: null,
      description: "",
      seasonName: "",
      episodes: [],
    },
    episode: {
      airDate: "",
      crew: [],
      episodeId: null,
      runtime: null,
      bgImgSrc: null,
      averageVote: null,
      seasonNumber: null,
      description: "",
      episodeTitle: "",
      votes: null,
      rated: null,
    },

    isLoading: false,
    error: { error: false, message: "" },
  },
  reducers: {
    getSerieData(state, action) {
      state.singleData = { ...action.payload };
    },
    seasonList(state, action) {
      state.seasons = [...action.payload];
    },
    singleSeason(state, action) {
      state.season = { ...action.payload };
    },
    singleEpisode(state, action) {
      state.episode = { ...action.payload };
    },

    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },
    errorHandler(state, action) {
      state.error = { ...action.payload };
    },
    updateWatchList(state, action) {
      state.singleData.watchlist = action.payload;
    },
    updateFavorite(state, action) {
      state.singleData.favorite = action.payload;
    },
    updateSeriesRatings(state, action) {
      state.singleData.rated = action.payload;
    },
    updateEpisodeRatings(state, action) {
      state.episode.rated = action.payload;
    },
  },
});

export const SerieAction = Serie.actions;
