import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteFavourite } from "./favouriteSlice";

export default function FavouritePage() {
  const dispatch = useAppDispatch();
  const favourite = useAppSelector((state) => {
    return state.favourite;
  });
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => navigate("/search")}>Перейти в Поиск</button>
      </div>
      <div>
        {favourite.films.map((f) => {
          return (
            <div key={f.imdbID} style={{ marginTop: "20px" }}>
              <img src={f.Poster} />
              <div>
                <b>{f.Title}</b>
              </div>
              <div>Год: {f.Year}</div>
              <div>Жанр: {f.Genre}</div>
              <div>Продолжительность: {f.Runtime}</div>
              <div>Режиссёр: {f.Director}</div>
              <div>Актёры: {f.Actors}</div>
              <div>Рейтинг: {f.Rated}</div>
              <button onClick={() => dispatch(deleteFavourite(f.imdbID))}>
                Удалить из Избранного
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
