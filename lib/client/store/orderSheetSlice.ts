import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  User: {
    name: string | null;
    email: string | null;
  };
  productInfo: {
    options: [];
  };
  deliveryInfo: {
    address: string | null;
    mobile: string | null;
  };
  payInfo: {
    paymentAmount: number;
  };
}

const initialState: InitialState = {
  User: {
    name: null,
    email: null,
  },
  productInfo: {
    options: [],
  },
  deliveryInfo: {
    address: null,
    mobile: null,
  },
  payInfo: {
    paymentAmount: 0,
  },
};

export const orderSheetSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderSheet: (state, action) => {
      const { User, productInfo, deliveryInfo, payInfo } = action.payload;
      if (User) state.User = User;
      if (productInfo) state.productInfo = productInfo;
      if (deliveryInfo) state.deliveryInfo = deliveryInfo;
      if (payInfo) state.payInfo = payInfo;
      // return action.payload;
    },
  },
  // reducers: { setOrderSheet: (state, action) => action.payload },
});

export const { setOrderSheet } = orderSheetSlice.actions;
