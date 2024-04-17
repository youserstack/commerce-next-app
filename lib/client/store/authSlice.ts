import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    resetCredentials: () => ({}),
  },
});

export const { setCredentials, resetCredentials }: any = authSlice.actions;
