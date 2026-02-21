import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MENU_ITEM_INDEX } from "../common/constants";

export type HeaderState = {
  isSearchExpanderVisible: boolean;
  activeMenuItem: string;
  headerSearchQuery: string;
};

const initState: HeaderState = {
  isSearchExpanderVisible: false,
  activeMenuItem: MENU_ITEM_INDEX,
  headerSearchQuery: "",
};

export const headerSlice = createSlice({
  name: "header",
  initialState: initState,
  reducers: {
    setSearchExpanderVisible: (state, action: PayloadAction<boolean>) => {
      state.isSearchExpanderVisible = action.payload;
    },
    setActiveMenuItem: (state, action: PayloadAction<string>) => {
      state.activeMenuItem = action.payload;
    },
    resetActiveMenuItem: (state) => {
      state.activeMenuItem = "";
    },
    setHeaderSearchQuery: (state, action: PayloadAction<string>) => {
      state.headerSearchQuery = action.payload;
    },
    resetHeaderSearchQuery: (state) => {
      state.isSearchExpanderVisible = false;
      state.headerSearchQuery = "";
    },
  },
});

export const {
  setSearchExpanderVisible,
  setActiveMenuItem,
  resetActiveMenuItem,
  setHeaderSearchQuery,
  resetHeaderSearchQuery,
} = headerSlice.actions;

export const headerReducer = headerSlice.reducer;
