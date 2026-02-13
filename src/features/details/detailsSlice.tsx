import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Details = {
  id: number;
  name: string;
  price: number;
  content: string;
};

export type DetailState = {
  error: string;
  isLoading: boolean;
  details?: Details;
};

const initState: DetailState = {
  error: "",
  isLoading: false,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState: initState,
  reducers: {
    loadDetailsRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = "";
      state.details = undefined;
    },
    loadDetailsSuccess: (state, action: PayloadAction<Details>) => {
      state.isLoading = false;
      state.error = "";
      state.details = action.payload;
    },
    loadDetailsFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.details = undefined;
    },
  },
});

export const { loadDetailsRequest, loadDetailsSuccess, loadDetailsFail } =
  detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
