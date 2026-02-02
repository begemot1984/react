export const API_KEY = "64405bd2";
export const SEARCH_URL = (query: string) =>
  `https://www.omdbapi.com?apikey=64405bd2&s=${query}`;
export const GET_URL = (imdbID: string) =>
  `https://www.omdbapi.com?apikey=64405bd2&i=${imdbID}`;
