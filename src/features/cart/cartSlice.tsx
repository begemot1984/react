import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem } from "../common/types";
import {
  LOCAL_STORAGE_KEY_ITEMS,
  METHOD_POST,
  POST_ORDER_HEADERS,
  URL_ORDER,
} from "../common/constants";

export type CartState = {
  items: CartItem[];
  customerPhone: string;
  customerAddress: string;
  customerAgree: boolean;
  isPosting: boolean;
  errorMessage: string;
  successMessage: string;
};

const initState: CartState = {
  items: restoreItemsFromLocalStorage(),
  customerPhone: "",
  customerAddress: "",
  customerAgree: false,
  isPosting: false,
  errorMessage: "",
  successMessage: "",
};

function saveItems2LocalStorage(items: CartItem[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(items));
}

function restoreItemsFromLocalStorage(): CartItem[] {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY_ITEMS);
  return value ? (JSON.parse(value) as CartItem[]) : [];
}

export const postOrderAsync = createAsyncThunk(
  "cart/postOrderAsync",
  async (body: string, { rejectWithValue }) => {
    const response = await fetch(URL_ORDER, {
      method: METHOD_POST,
      headers: POST_ORDER_HEADERS,
      body: body,
    });

    if (!response.ok) {
      return rejectWithValue(
        `Ошибка заказа: ${response.status} ${response.statusText} ${response.body}`,
      );
    }
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      // merge by id + size, update title/quantity/price
      const existingItem = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size,
      );
      if (existingItem) {
        const mergedItem = {
          ...existingItem,
          title: action.payload.title,
          quantity: existingItem.quantity + action.payload.quantity,
          price: action.payload.price,
        };
        state.items = state.items.filter(
          (i) => i.id !== action.payload.id || i.size !== action.payload.size,
        );
        state.items.push(mergedItem);
      } else {
        state.items.push(action.payload);
      }
      saveItems2LocalStorage(state.items);
      state.successMessage = "";
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id != action.payload);
      saveItems2LocalStorage(state.items);
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
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderAsync.pending, (state) => {
        state.isPosting = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(postOrderAsync.fulfilled, (state) => {
        state.isPosting = false;
        state.errorMessage = "";
        state.successMessage = "Товары успешно заказаны";
        state.items = [];
        state.customerPhone = "";
        state.customerAddress = "";
        state.customerAgree = false;
        saveItems2LocalStorage(state.items);
      })
      .addCase(postOrderAsync.rejected, (state, action) => {
        state.isPosting = false;
        state.successMessage = "";
        state.errorMessage =
          typeof action.payload === "string"
            ? action.payload
            : `Ошибка заказа: ${action.error.message}`;
      });
  },
});

export const {
  addCartItem,
  removeCartItem,
  setCustomerPhone,
  setCustomerAddres,
  setCustomerAgree,
  setErrorMessage,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
