import { createSlice } from "@reduxjs/toolkit";

export const AllContentSlice = createSlice({
  name: "modifier",
  initialState: { content: [] },
  reducers: {
    modifyContent(state, action) {
      const temp = [...action.payload];
      const reArrange = temp
        .map((c) => c.content)
        .flat(1)
        .map((id) => id.id);

      state.content = [...reArrange];
    },
  },
});
export const AllContentAction = AllContentSlice.actions;
