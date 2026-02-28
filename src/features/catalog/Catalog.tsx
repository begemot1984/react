import { useEffect, type ChangeEvent, type FC, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadCatalogAsync,
  loadCategoriesAsync,
  setCatalogLoadParams,
  setCurrentSearchQuery,
} from "./catalogSlice";
import { Link } from "react-router-dom";
import {
  CATEGORY_ID_ALL,
  MENU_ITEM_CATALOG,
  PARAM_CATEGORY,
  PARAM_OFFSET,
  PARAM_QUERY,
} from "../common/constants";
import { highlightActiveMenuItem } from "../header/headerSlice";
import Preloader from "../common/Preloader";
import { ErrorMessage } from "../common/ErrorMessage";
import { CatalogItems } from "../common/CatalogItems";

export const Catalog: FC<CatalogProps> = ({ isStandalone }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (isStandalone) {
      dispatch(highlightActiveMenuItem(MENU_ITEM_CATALOG));
    }
  });

  useEffect(() => {
    dispatch(loadCategoriesAsync());
  }, [dispatch]);

  // получить товары по текущему фильтру
  useEffect(() => {
    const params: string[][] = [];
    if (state.loadParams.query.trim() !== "") {
      params.push([PARAM_QUERY, state.loadParams.query]);
    }
    if (state.loadParams.category !== CATEGORY_ID_ALL) {
      params.push([PARAM_CATEGORY, state.loadParams.category.toString()]);
    }
    if (state.loadParams.offset > 0) {
      params.push([PARAM_OFFSET, state.loadParams.offset.toString()]);
    }
    dispatch(loadCatalogAsync(new URLSearchParams(params)));
  }, [state.loadParams, dispatch]);

  const onChangeCategory = (categoryId: number) => {
    dispatch(
      setCatalogLoadParams({
        ...state.loadParams,
        category: categoryId,
        offset: 0,
        resetItems: true,
      }),
    );
  };

  const onLoadMore = () => {
    dispatch(
      setCatalogLoadParams({
        ...state.loadParams,
        offset: state.goods.items.length,
        resetItems: false,
      }),
    );
  };

  const onSearchClick = () => {
    dispatch(
      setCatalogLoadParams({
        ...state.loadParams,
        query: state.currentSearchQuery,
        offset: 0,
        resetItems: true,
      }),
    );
  };

  const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSearchClick();
  };

  const onChangeCurrentSearchQuery = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentSearchQuery(evt.target.value));
  };

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {isStandalone && (
          <form
            className="catalog-search-form form-inline"
            onSubmit={onSearchSubmit}
          >
            <input
              className="form-control"
              placeholder="Поиск"
              value={state.currentSearchQuery}
              onChange={onChangeCurrentSearchQuery}
            />
            <div onClick={onSearchClick} className="form-icon"></div>
          </form>
        )}
        {state.categories.errorMessage.trim() !== "" && (
          <ErrorMessage msg={state.categories.errorMessage} />
        )}
        {state.categories.isLoading && <Preloader />}
        <ul className="catalog-categories nav justify-content-center">
          {state.categories.items.map((i) => {
            return (
              <li className="nav-item" key={i.id}>
                <Link
                  className={
                    "nav-link" +
                    (i.id === state.loadParams.category ? " active" : "")
                  }
                  to="#"
                  onClick={() => onChangeCategory(i.id)}
                >
                  {i.title}
                </Link>
              </li>
            );
          })}
        </ul>
        {state.goods.errorMessage.trim() !== "" && (
          <ErrorMessage msg={state.goods.errorMessage} />
        )}
        <CatalogItems items={state.goods.items} />
        {state.goods.isLoading && <Preloader />}
        {!state.goods.isLoading && state.isNextDataAvailable && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={onLoadMore}>
              Загрузить ещё
            </button>
          </div>
        )}
      </section>
    </>
  );
};

type CatalogProps = {
  isStandalone: boolean;
};
