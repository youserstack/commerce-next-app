import { createSlice } from "@reduxjs/toolkit";

// interface InitialState {
//   children: [] | any;
// }

// const initialState: InitialState = {
//   children: [],
// };
// const initialState: any = [];
const initialState: any = {};

export const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    setChildren: (state, action) => {
      // state.push(action.payload);
      return action.payload;
    },
  },
});

export const { setChildren }: any = childrenSlice.actions;
