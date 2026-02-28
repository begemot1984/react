import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ShoeItem } from "../common/types";
import { MAX_QUANTITY, MIN_QUANTITY, URL_ITEM } from "../common/constants";

export type ItemState = {
  item?: ShoeItem;
  isLoading: boolean;
  errorMessage: string;
  quantity: number;
  selectedSize?: string;
};

const initState: ItemState = {
  isLoading: false,
  errorMessage: "",
  quantity: MIN_QUANTITY,
};

export const loadItemAsync = createAsyncThunk(
  "item/loadItemAsync",
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(URL_ITEM(id));
    if (response.ok) {
      return response.json().then((j) => j as ShoeItem);
    } else if (response.status === 404) {
      return rejectWithValue(`Товар ${id} не найден`);
    } else {
      return rejectWithValue(
        `${response.status} ${response.statusText} ${response.body}`,
      );
    }
  },
);

export const itemSlice = createSlice({
  name: "item",
  initialState: initState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    incrementQuantity: (state) => {
      if (state.quantity < MAX_QUANTITY) state.quantity++;
    },
    decrementQuantity: (state) => {
      if (state.quantity > MIN_QUANTITY) state.quantity--;
    },
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItemAsync.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.selectedSize = "";
        state.quantity = MIN_QUANTITY;
      })
      .addCase(
        loadItemAsync.fulfilled,
        (state, action: PayloadAction<ShoeItem>) => {
          state.item = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(loadItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          typeof action.payload === "string"
            ? action.payload
            : `Ошибка загрузки товара ${action.meta.arg}: ${action.error.message}`;
      });
  },
});

export const {
  setErrorMessage,
  incrementQuantity,
  decrementQuantity,
  setSelectedSize,
} = itemSlice.actions;

export const itemsReducer = itemSlice.reducer;
