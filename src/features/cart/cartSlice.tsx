import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShoeItem } from "../common/types";

export type CartState = {
  items: ShoeItem[];
  customerPhone: string;
  customerAddress: string;
  customerAgree: boolean;
};

const initState: CartState = {
  items: [],
  customerPhone: "",
  customerAddress: "",
  customerAgree: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addCartItem: (state, action: PayloadAction<ShoeItem>) => {
      state.items.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id != action.payload);
    },
    setCustomerPhone: (state, action: PayloadAction<string>) => {
      state.customerPhone = action.payload;
    },
    setCustomerAddres: (state, action: PayloadAction<string>) => {
      state.customerAddress = action.payload;
    },
    setCustomerAgree: (state, action: PayloadAction<boolean>) => {
      state.customerAgree = action.payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  setCustomerPhone,
  setCustomerAddres,
  setCustomerAgree,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
