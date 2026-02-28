import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  toggleSearchExpanderVisible,
  setHeaderSearchQuery,
} from "./headerSlice";
import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import { createSelector } from "@reduxjs/toolkit";
import {
  CATEGORY_ID_ALL,
  MENU_ITEM_ABOUT,
  MENU_ITEM_CATALOG,
  MENU_ITEM_CONTACTS,
  MENU_ITEM_INDEX,
  PAGE_ABOUT,
  PAGE_CART,
  PAGE_CATALOG,
  PAGE_CONTACTS,
  PAGE_INDEX,
} from "../common/constants";
import { setCatalogLoadParams } from "../catalog/catalogSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectState = createSelector(
    [(state) => state.header, (state) => state.cart.items.length],
    (headerState, cartItemCount) => {
      return { ...headerState, cartItemCount };
    },
  );
  const state = useAppSelector((state) => selectState(state));

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.isSearchExpanderVisible) {
      searchInputRef.current!.focus();
    }
  }, [state.isSearchExpanderVisible]);

  const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSearchClick();
  };
  const onSearchClick = () => {
    if (
      state.isSearchExpanderVisible &&
      state.headerSearchQuery.trim() !== ""
    ) {
      dispatch(
        setCatalogLoadParams({
          query: state.headerSearchQuery,
          category: CATEGORY_ID_ALL,
          offset: 0,
          resetItems: true,
        }),
      );
      dispatch(toggleSearchExpanderVisible());
      navigate(PAGE_CATALOG);
    } else {
      dispatch(toggleSearchExpanderVisible());
    }
  };

  const onChangeCurrentSearchQuery = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHeaderSearchQuery(evt.target.value));
  };

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to={PAGE_INDEX}>
                <img src="/img/header-logo.png" alt="Bosa Noga" />
              </Link>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  {[
                    {
                      itemName: MENU_ITEM_INDEX,
                      destination: PAGE_INDEX,
                      itemText: "Главная",
                    },
                    {
                      itemName: MENU_ITEM_CATALOG,
                      destination: PAGE_CATALOG,
                      itemText: "Каталог",
                    },
                    {
                      itemName: MENU_ITEM_ABOUT,
                      destination: PAGE_ABOUT,
                      itemText: "О магазине",
                    },
                    {
                      itemName: MENU_ITEM_CONTACTS,
                      destination: PAGE_CONTACTS,
                      itemText: "Контакты",
                    },
                  ].map((i) => {
                    return (
                      <li
                        className={
                          "nav-item" +
                          (i.itemName === state.activeMenuItem ? " active" : "")
                        }
                        key={i.itemName}
                      >
                        <Link className="nav-link" to={i.destination}>
                          {i.itemText}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={onSearchClick}
                    ></div>
                    <div
                      className="header-controls-pic header-controls-cart"
                      onClick={() => navigate(PAGE_CART)}
                    >
                      {state.cartItemCount > 0 && (
                        <div className="header-controls-cart-full">
                          {state.cartItemCount}
                        </div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form
                    data-id="search-form"
                    className={
                      "header-controls-search-form form-inline" +
                      (state.isSearchExpanderVisible ? "" : " invisible")
                    }
                    onSubmit={onSearchSubmit}
                  >
                    <input
                      className="form-control"
                      placeholder="Поиск"
                      ref={searchInputRef}
                      value={state.headerSearchQuery}
                      onChange={onChangeCurrentSearchQuery}
                      onClick={onSearchClick}
                    />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
