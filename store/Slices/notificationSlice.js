import { createSlice } from "@reduxjs/toolkit";

export const NotifySlice = createSlice({
  name: "notifier",
  initialState: { isOpened: false, message: "" },
  reducers: {
    notifierHandler(state, action) {
      state.isOpened = action.payload.isOpened;
      state.message = action.payload.message;
    },
  },
});

export const Notifier = NotifySlice.actions.notifierHandler;
