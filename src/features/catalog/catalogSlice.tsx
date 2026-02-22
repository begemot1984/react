import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CatalogItem, Category } from "../common/types";
import {
  CATEGORY_ID_ALL,
  GOODS_BATCH_SIZE,
  URL_CATALOG,
  URL_CATEGORIES,
} from "../common/constants";

export type CatalogData<T> = {
  isLoading: boolean;
  errorMessage: string;
  items: T[];
};

export type CatalogLoadParams = {
  query: string;
  category: number;
  offset: number;
  resetItems: boolean;
};

export type CatalogState = {
  currentSearchQuery: string;
  loadParams: CatalogLoadParams;
  isNextDataAvailable: boolean;
  goods: CatalogData<CatalogItem>;
  categories: CatalogData<Category>;
};

const initState: CatalogState = {
  currentSearchQuery: "",
  loadParams: {
    query: "",
    category: CATEGORY_ID_ALL,
    offset: 0,
    resetItems: true,
  },
  isNextDataAvailable: true,
  goods: {
    isLoading: false,
    errorMessage: "",
    items: [],
  },
  categories: {
    isLoading: false,
    errorMessage: "",
    items: [],
  },
};

export const loadCatalogAsync = createAsyncThunk(
  "catalog/loadCatalogAsync",
  async (params: URLSearchParams): Promise<CatalogItem[]> => {
    return await fetch(`${URL_CATALOG}?${params}`)
      .then((r) => r.json())
      .then((j) => j as CatalogItem[]);
  },
);

export const loadCategoriesAsync = createAsyncThunk(
  "catalog/loadCategoriesAsync",
  async (): Promise<Category[]> => {
    return await fetch(URL_CATEGORIES)
      .then((r) => r.json())
      .then((j) => j as Category[]);
  },
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: initState,
  reducers: {
    setCurrentSearchQuery: (state, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload;
    },
    setCatalogLoadParams: (state, action: PayloadAction<CatalogLoadParams>) => {
      state.loadParams = action.payload;
      state.currentSearchQuery = state.loadParams.query;
    },
  },
  extraReducers: (builder) => {
    builder
      // товары
      .addCase(loadCatalogAsync.pending, (state) => {
        state.goods.isLoading = true;
        state.goods.errorMessage = "";
      })
      .addCase(
        loadCatalogAsync.fulfilled,
        (state, action: PayloadAction<CatalogItem[]>) => {
          if (state.loadParams.resetItems) {
            state.goods.items = [];
            state.isNextDataAvailable = true;
          }
          action.payload.forEach((i) => state.goods.items.push(i));
          state.goods.isLoading = false;
          if (state.goods.items.length === 0) {
            state.goods.errorMessage = "Товары не найдены";
          }
          if (action.payload.length < GOODS_BATCH_SIZE) {
            state.isNextDataAvailable = false;
          }
        },
      )
      .addCase(loadCatalogAsync.rejected, (state, action) => {
        state.goods.isLoading = false;
        state.goods.errorMessage = action.error.message
          ? `Ошибка загрузки товаров: ${action.error.message}`
          : "Неизвестная ошибка загрузки товаров";
      })
      // категории
      .addCase(loadCategoriesAsync.pending, (state) => {
        state.categories.isLoading = true;
        state.categories.errorMessage = "";
      })
      .addCase(
        loadCategoriesAsync.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories.items = [];
          state.categories.items.push({
            id: CATEGORY_ID_ALL,
            title: "Все",
          });
          action.payload.forEach((i) => state.categories.items.push(i));
          state.categories.isLoading = false;
        },
      )
      .addCase(loadCategoriesAsync.rejected, (state, action) => {
        state.categories.isLoading = false;
        state.categories.errorMessage = action.error.message
          ? `Ошибка загрузки категорий: ${action.error.message}`
          : "Неизвестная ошибка загрузки категорий";
      });
  },
});

export const { setCurrentSearchQuery, setCatalogLoadParams } =
  catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
