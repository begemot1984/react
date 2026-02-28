import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { URL_TOP_SALES } from "../common/constants";
import type { CatalogItem } from "../common/types";

export type TopSalesState = {
  topSales: CatalogItem[];
  isLoading: boolean;
  errorMessage: string;
};

const initState: TopSalesState = {
  topSales: [],
  isLoading: false,
  errorMessage: "",
};

export const loadTopSalesAsync = createAsyncThunk(
  "topSales/loadTopSalesAsync",
  async (): Promise<CatalogItem[]> => {
    return await fetch(URL_TOP_SALES)
      .then((r) => r.json())
      .then((j) => j as CatalogItem[]);
  },
);

export const topSalesSlice = createSlice({
  name: "topSales",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTopSalesAsync.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(
        loadTopSalesAsync.fulfilled,
        (state, action: PayloadAction<CatalogItem[]>) => {
          state.topSales = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(loadTopSalesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message
          ? `Ошибка загрузки хитов продаж: ${action.error.message}`
          : "Неизвестная ошибка загрузки хитов продаж";
      });
  },
});

export const topSalesReducer = topSalesSlice.reducer;
