import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { GET_URL } from "../common/constants";

export type FavouriteState = {
  films: FavouriteFilm[];
  status: string;
};

export type FavouriteFilm = {
  imdbID: string;
  Poster: string;
  Title: string;
  Genre: string;
  Year: string;
  Runtime: string;
  Director: string;
  Actors: string;
  Rated: string;
};

const initState: FavouriteState = {
  films: [],
  status: "",
};

export const addFavouriteAsync = createAsyncThunk(
  "favourite/getFilm",
  async (imdbID: string): Promise<FavouriteFilm> => {
    return await fetch(GET_URL(imdbID))
      .then((r) => r.json())
      .then((j) => j as FavouriteFilm);
  },
);

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initState,
  reducers: {
    deleteFavourite: (state, action) => {
      state.films = state.films.filter((f) => f.imdbID != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavouriteAsync.pending, (state) => {
        state.status = "Получение данных фильма по IMDB ID...";
      })
      .addCase(
        addFavouriteAsync.fulfilled,
        (state, action: PayloadAction<FavouriteFilm>) => {
          state.status = "";
          state.films.push(action.payload);
        },
      )
      .addCase(addFavouriteAsync.rejected, (state) => {
        state.status = "Ошибка получения данных фильма";
      });
  },
});

export const favouriteReducer = favouriteSlice.reducer;

export const { deleteFavourite } = favouriteSlice.actions;
