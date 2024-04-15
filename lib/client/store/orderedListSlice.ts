import { createSlice } from "@reduxjs/toolkit";

interface Order {
  product: {};
  ordererInfo?: {
    name: string | null;
    email: string | null;
  };
  deliveryInfo?: {
    address: string | null;
    mobile: string | null;
  };
  payInfo?: {
    total: number;
    isPay: boolean;
  };
}

interface InitialState {
  orders: Order[];
}

const initialState: InitialState = {
  orders: [],
};

export const orderedListSlice = createSlice({
  name: "orderedList",
  initialState,
  reducers: {
    setOrderedList: (state, action) => {
      const orders = action.payload;
      state.orders = orders;
    },
  },
});

export const { setOrderedList } = orderedListSlice.actions;
