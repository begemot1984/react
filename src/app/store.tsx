import { headerReducer } from "../features/header/headerSlice";
import { cartReducer } from "../features/cart/cartSlice.tsx";
import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { catalogReducer } from "../features/catalog/catalogSlice.tsx";
import { topSalesReducer } from "../features/index/topSalesSlice.tsx";

export const store = configureStore({
  reducer: {
    header: headerReducer,
    cart: cartReducer,
    catalog: catalogReducer,
    topSales: topSalesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
