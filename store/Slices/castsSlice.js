import { createSlice } from "@reduxjs/toolkit";

export const CastsSlice = createSlice({
  name: "Casts",
  initialState: {
    casts: [],
    castserror: { error: false, message: "" },
    isLoading: true,
  },
  reducers: {
    addCast(state, action) {
      state.casts = [...action.payload.casts];
      state.castserror = { error: false, message: "" };
    },
    errorHandler(state, action) {
      state.casts = [];
      state.castserror = action.payload.castserror;
    },
    loadingHandler(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const CastsAction = CastsSlice.actions;
