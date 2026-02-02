import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchAsync, setQuery } from "./searchSlice";
import { addFavouriteAsync } from "../favourite/favouriteSlice";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => {
    return state.search;
  });
  const favourite = useAppSelector((state) => {
    return state.favourite;
  });
  const navigate = useNavigate();

  const searchFilms = () => {
    if (search.query.length > 0 && search.query != search.prevQuery) {
      dispatch(searchAsync(search.query));
    }
  };

  const addFavourite = (imdbID: string) => {
    if (!favourite.films.find((f) => f.imdbID == imdbID)) {
      dispatch(addFavouriteAsync(imdbID));
    }
  };

  return (
    <div>
      <label htmlFor="query">Поиск:</label>
      <input
        type="text"
        id="query"
        value={search.query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      <button onClick={searchFilms}>Искать</button>
      <button onClick={() => navigate("/favourite")}>
        Перейти в Избранное
      </button>
      {search.status != "" && <span>{search.status}</span>}
      {favourite.status != "" && <span>{favourite.status}</span>}
      {search.films.map((f) => {
        return (
          <div key={f.imdbID} style={{ marginTop: "20px" }}>
            <div>
              <b>{f.Title}</b>
            </div>
            <div>Год: {f.Year}</div>
            <img src={f.Poster} />
            <div>
              <button onClick={() => addFavourite(f.imdbID)}>
                Добавить в Избранное
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
