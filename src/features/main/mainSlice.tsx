import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Service = {
  id: number;
  name: string;
  price: number;
};

export type ServiceState = {
  error: string;
  isLoading: boolean;
  services: Service[];
};

const initState: ServiceState = {
  error: "",
  isLoading: false,
  services: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initState,
  reducers: {
    loadServicesRequest: (state) => {
      state.isLoading = true;
      state.error = "";
      state.services = [];
    },
    loadServicesSuccess: (state, action: PayloadAction<Service[]>) => {
      state.isLoading = false;
      state.error = "";
      state.services = action.payload;
    },
    loadServicesFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.services = [];
    },
  },
});

export const { loadServicesRequest, loadServicesSuccess, loadServicesFail } =
  mainSlice.actions;

export const mainReducer = mainSlice.reducer;
