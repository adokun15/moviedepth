import { createSlice } from "@reduxjs/toolkit";

export const RatingSlice = createSlice({
  name: "ratingSlice",
  initialState: {
    ratings: {
      isOpened: false,
      ratingValue: null,
      mediaId: null,
      mediaName: "",
      mediaType: "",
      seasonNumber: null,
      episodeNumber: null,
    },
  },
  reducers: {
    ratingFunc(state, action) {
      state.ratings = { ...action.payload };
    },
    toggleModal(state, action) {
      state.ratings.isOpened = action.payload;
    },
  },
});
export const RatingAction = RatingSlice.actions;
