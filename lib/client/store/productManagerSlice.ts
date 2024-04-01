import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  productId?: string | null;
  productIds?: string[] | null;
  reviewId?: string | null;
  reviewIds?: string[] | null;
}

const initialState: InitialState = {
  productId: null,
  productIds: [],
  reviewId: null,
  reviewIds: [],
};

export const productManagerSlice = createSlice({
  name: "productManager",
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setProductIds: (state, action) => {
      state.productIds = action.payload;
    },
    setReviewId: (state, action) => {
      state.reviewId = action.payload;
    },
    setReviewIds: (state, action) => {
      state.reviewIds = action.payload;
    },
  },
});

export const { setProductId, setProductIds, setReviewId, setReviewIds }: any =
  productManagerSlice.actions;
