import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCatalogSearchQuery } from "./catalogSlice";
import { Link } from "react-router-dom";
import { MENU_ITEM_CATALOG, PAGE_ITEM } from "../common/constants";
import { setActiveMenuItem } from "../header/headerSlice";
import Preloader from "../common/Preloader";

export const Catalog: FC<CatalogProps> = ({ search }) => {
  // TODO: dynamic menu and catalog
  // TODO: use <Preloader /> while loading
  // TODO: <Link> instead of <a> to avoid page reload
  // TODO: search form preventDefault, start search
  // TODO: load more (offset in url params)
  // TODO: search by catalogId
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(setActiveMenuItem(MENU_ITEM_CATALOG));
  });

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {search && (
          <form className="catalog-search-form form-inline">
            <input
              className="form-control"
              placeholder="Поиск"
              value={state.catalogSearchQuery}
              onChange={(evt) =>
                dispatch(setCatalogSearchQuery(evt.target.value))
              }
            />
          </form>
        )}
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Все
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Женская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Мужская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Обувь унисекс
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Детская обувь
            </a>
          </li>
        </ul>
        <div className="row">
          {state.errorMessage.trim() !== "" && <div>{state.errorMessage}</div>}
          {state.isLoading && <Preloader />}
          <div className="col-4">
            {state.items.map((i) => {
              return (
                <div className="card catalog-item-card" key={i.id}>
                  <img
                    src={i.images[0]}
                    className="card-img-top img-fluid"
                    alt={i.title}
                  />
                  <div className="card-body">
                    <p className="card-text">{i.title}</p>
                    <p className="card-text">{i.price}</p>
                    <Link
                      to={PAGE_ITEM(i.id)}
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
      </section>
    </>
  );
};

type CatalogProps = {
  search: boolean;
};
