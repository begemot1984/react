import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CatalogItem } from "../common/types";
import { URL_CATALOG } from "../common/constants";

export type CatalogState = {
  catalogSearchQuery: string;
  isLoading: boolean;
  errorMessage: string;
  items: CatalogItem[];
};

const initState: CatalogState = {
  catalogSearchQuery: "",
  isLoading: false,
  errorMessage: "",
  items: [],
};

export const loadCatalogAsync = createAsyncThunk(
  "catalog/loadCatalogAsync",
  async (params: URLSearchParams): Promise<CatalogItem[]> => {
    return await fetch(`${URL_CATALOG}?${params}`)
      .then((r) => r.json())
      .then((j) => j as CatalogItem[]);
  },
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: initState,
  reducers: {
    setCatalogSearchQuery: (state, action: PayloadAction<string>) => {
      state.catalogSearchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCatalogAsync.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(
        loadCatalogAsync.fulfilled,
        (state, action: PayloadAction<CatalogItem[]>) => {
          state.items = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(loadCatalogAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message
          ? `Ошибка загрузки каталога: ${action.error.message}`
          : "Неизвестная ошибка загрузки каталога";
      });
  },
});

export const { setCatalogSearchQuery } = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
