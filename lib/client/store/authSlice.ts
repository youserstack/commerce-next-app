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
      // console.log({ "action.payload": action.payload });
      if (!action.payload) {
        state.user = null;
        state.accessToken = null;
        return;
      }
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    // signout: (state, action) => {
    //   state.user = null;
    //   state.accessToken = null;
    // },
    updateUser: (state, action) => {
      const { user } = action.payload;
      const { username, email, role, image } = user;
      if (username) state.user.username = username;
      if (email) state.user.email = email;
      if (role) state.user.role = role;
      if (image) state.user.image = image;
    },
    clearCredentials: (state, action) => (state.accessToken = null),
  },
});
export const { setCredentials, updateUser, clearCredentials }: any = authSlice.actions;
