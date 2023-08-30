import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toggle: false,
    isLoading: true,
    error: [],
    toggleAuth: false,
    togglePhoneModal: false,
  },
  reducers: {
    toggleHandler(state) {
      state.toggle = !state.toggle;
    },
    toggleAuthHandler(state, action) {
      state.toggleAuth = action.payload;
    },
    togglePhone(state, action) {
      state.togglePhoneModal = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
