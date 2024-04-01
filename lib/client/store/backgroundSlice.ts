import { createSlice } from "@reduxjs/toolkit";

export const backgroundSlice = createSlice({
  name: "background",
  initialState: false,
  reducers: { setBackground: (state, action) => (state = action.payload) },
});

export const { setBackground }: any = backgroundSlice.actions;
