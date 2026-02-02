import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchPage from "./features/search/SearchPage";
import FilmPage from "./features/film/FilmPage";
import FavouritePage from "./features/favourite/FavouritePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={SearchPage} />
        <Route path="/search" Component={SearchPage} />
        <Route path="/film" Component={FilmPage} />
        <Route path="/favourite" Component={FavouritePage} />
      </Routes>
    </>
  );
}

export default App;
