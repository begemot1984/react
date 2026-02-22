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
    toggleSearchExpanderVisible: (state) => {
      state.isSearchExpanderVisible = !state.isSearchExpanderVisible;
      state.headerSearchQuery = "";
    },
    setActiveMenuItem: (state, action: PayloadAction<string>) => {
      state.activeMenuItem = action.payload;
    },
    setHeaderSearchQuery: (state, action: PayloadAction<string>) => {
      state.headerSearchQuery = action.payload;
    },
  },
});

export const {
  toggleSearchExpanderVisible,
  setActiveMenuItem,
  setHeaderSearchQuery,
} = headerSlice.actions;

export const headerReducer = headerSlice.reducer;
