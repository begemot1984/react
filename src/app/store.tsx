import { favouriteReducer } from "../features/favourite/favouriteSlice";
import { searchReducer } from "../features/search/searchSlice";
import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favourite: favouriteReducer,
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
