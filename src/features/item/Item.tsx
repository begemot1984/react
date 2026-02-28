import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Preloader from "../common/Preloader";
import { highlightActiveMenuItem } from "../header/headerSlice";
import {
  decrementQuantity,
  incrementQuantity,
  loadItemAsync,
  setErrorMessage,
  setSelectedSize,
} from "./itemSlice";
import { ErrorMessage } from "../common/ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { addCartItem } from "../cart/cartSlice";
import { PAGE_CART } from "../common/constants";

export default function Item() {
  const dispatch = useAppDispatch();

  const selectState = createSelector(
    [(state: RootState) => state.item],
    (itemState) => {
      const sizesAvailable =
        itemState.item &&
        itemState.item?.sizes.filter((s) => s.available).length > 0;
      return {
        ...itemState,
        sizesAvailable,
      };
    },
  );
  const state = useAppSelector((state) => selectState(state));

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(highlightActiveMenuItem(""));
  });

  useEffect(() => {
    if (id) {
      const itemId = +id;
      if (isNaN(itemId)) {
        dispatch(setErrorMessage("ID товара должен быть числом"));
      } else {
        dispatch(loadItemAsync(itemId));
      }
    } else {
      dispatch(setErrorMessage("ID товара неопределён"));
    }
  }, [dispatch, id]);

  const onAddItem = () => {
    if (state.item && state.selectedSize) {
      dispatch(
        addCartItem({
          id: state.item.id,
          title: state.item.title,
          size: state.selectedSize,
          quantity: state.quantity,
          price: state.item.price,
        }),
      );
      navigate(PAGE_CART);
    }
  };

  return (
    <>
      {state.isLoading && <Preloader />}
      {state.errorMessage.trim() !== "" && (
        <ErrorMessage msg={state.errorMessage} />
      )}
      {state.item && (
        <section className="catalog-item">
          <h2 className="text-center">{state.item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={state.item.images[0]}
                className="img-fluid"
                alt={state.item.title}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{state.item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{state.item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{state.item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{state.item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{state.item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{state.item.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:{" "}
                  {state.item.sizes.map((s) => {
                    let sizeClassName = "catalog-item-size";
                    if (state.selectedSize === s.size) {
                      sizeClassName += " selected";
                    }
                    return (
                      s.available && (
                        <span
                          className={sizeClassName}
                          onClick={() => dispatch(setSelectedSize(s.size))}
                          key={s.size}
                        >
                          {s.size}{" "}
                        </span>
                      )
                    );
                  })}
                </p>
                {state.sizesAvailable && (
                  <p>
                    Количество:{" "}
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(decrementQuantity())}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">
                        {state.quantity}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(incrementQuantity())}
                      >
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>
              {state.sizesAvailable && state.selectedSize && (
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={onAddItem}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
