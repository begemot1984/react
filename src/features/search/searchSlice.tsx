import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { SEARCH_URL } from "../common/constants";

export type FoundFilm = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

type SearchResult = {
  Search?: FoundFilm[];
  Response: boolean;
  Error?: string;
};

export type SearchState = {
  query: string;
  prevQuery: string; // чтобы не искать одно и то же
  status: string;
  films: FoundFilm[];
};

const initState: SearchState = {
  query: "",
  prevQuery: "",
  status: "",
  films: [],
};

export const searchAsync = createAsyncThunk(
  "search/searchFilms",
  async (query: string): Promise<SearchResult> => {
    return await fetch(SEARCH_URL(query))
      .then((r) => r.json())
      .then((j) => j as SearchResult);
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.prevQuery = state.query;
        state.status = "Поиск фильмов по запросу...";
      })
      .addCase(
        searchAsync.fulfilled,
        (state, action: PayloadAction<SearchResult>) => {
          state.films = [];

          if (action.payload.Response) {
            action.payload.Search?.filter(
              (i) => i.Type == "movie" || i.Type == "series",
            ).forEach((value) => {
              // group by imdbID
              if (!state.films.find((f) => f.imdbID == value.imdbID)) {
                state.films.push(value);
              }
            });
            state.status = state.films.length == 0 ? "Фильмы не найдены" : "";
          } else {
            state.status = action.payload.Error!;
          }
        },
      )
      .addCase(searchAsync.rejected, (state) => {
        state.status = "Ошибка поиска";
      });
  },
});

export const { setQuery } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
