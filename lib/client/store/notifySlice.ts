import { createSlice } from "@reduxjs/toolkit";
interface notify {
  active?: boolean;
  status?: "success" | "error" | null;
  message?: string | null;
  //
  // timeoutId?: number | null;
  // count?: any;
  // messages: string[];
}
const initialState: notify = {
  active: false,
  status: null,
  message: "",
  // timeoutId: null,
  // count: 0,

  // messages: [],
  // success: false,
  // error: false,
  // response: null,
  // message: undefined,
};
export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotify: (state, action) => {
      const { status, message, active } = action.payload;
      state.active = active;
      state.status = status;
      state.message = message;
      // state.count++;
    },
    // setTimeoutId: (state, action) => {
    //   state.timeoutId = action.payload;
    // },
  },
});
export const { setNotify } = notifySlice.actions;
