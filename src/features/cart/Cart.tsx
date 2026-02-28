import { useEffect, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { highlightActiveMenuItem } from "../header/headerSlice";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { PAGE_ITEM } from "../common/constants";
import {
  postOrderAsync,
  removeCartItem,
  setCustomerAddres,
  setCustomerAgree,
  setCustomerPhone,
  setErrorMessage,
} from "./cartSlice";
import { NumericFormat } from "react-number-format";
import { ErrorMessage } from "../common/ErrorMessage";
import Preloader from "../common/Preloader";
import { SuccessMessage } from "../common/SuccessMessage";

export default function Cart() {
  const dispatch = useAppDispatch();

  const selectState = createSelector(
    [(state: RootState) => state.cart],
    (cartState) => {
      const itemsWithPriceByQuantity = cartState.items.map((i) => {
        return {
          ...i,
          priceByQuantity: i.price * i.quantity, // итого
        };
      });
      let total = 0;
      itemsWithPriceByQuantity.forEach((i) => (total += i.priceByQuantity));
      return {
        ...cartState,
        items: itemsWithPriceByQuantity,
        total,
      };
    },
  );
  const state = useAppSelector((state) => selectState(state));

  useEffect(() => {
    dispatch(highlightActiveMenuItem(""));
  });

  function priceFormat(value: number) {
    return (
      <NumericFormat
        value={value}
        displayType="text"
        thousandSeparator=" "
        decimalSeparator="."
      />
    );
  }

  const onSubmitOrder = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    let errorMessage = "";

    function addErrorMessage(auxErrorMessage: string): void {
      errorMessage =
        errorMessage.trim() === ""
          ? auxErrorMessage
          : errorMessage + `; ${auxErrorMessage}`;
    }

    if (state.customerPhone.trim() === "") {
      addErrorMessage("Телефон не может быть пустым");
    }

    if (state.customerAddress.trim() === "") {
      addErrorMessage("Адрес не может быть пустым");
    }

    if (state.items.length === 0) {
      addErrorMessage("Корзина не может быть пустой");
    }

    if (errorMessage.trim() === "") {
      dispatch(
        postOrderAsync(
          JSON.stringify({
            owner: {
              phone: state.customerPhone,
              address: state.customerAddress,
            },
            items: state.items.map((i) => {
              return {
                id: i.id,
                price: i.price,
                count: i.quantity,
              };
            }),
          }),
        ),
      );
    } else {
      dispatch(setErrorMessage(errorMessage));
    }
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((i) => {
              return (
                <tr key={`${i.id}-${i.size}`}>
                  <td scope="row">{state.items.indexOf(i) + 1}</td>
                  <td>
                    <Link to={PAGE_ITEM(i.id)}>{i.title}</Link>
                  </td>
                  <td>{i.size}</td>
                  <td>{i.quantity}</td>
                  <td>{priceFormat(i.price)}</td>
                  <td>{priceFormat(i.priceByQuantity)}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(removeCartItem(i))}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{priceFormat(state.total)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
          <form className="card-body" onSubmit={onSubmitOrder}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
                value={state.customerPhone}
                onChange={(evt) => dispatch(setCustomerPhone(evt.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
                value={state.customerAddress}
                onChange={(evt) =>
                  dispatch(setCustomerAddres(evt.target.value))
                }
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                onChange={() =>
                  dispatch(setCustomerAgree(!state.customerAgree))
                }
                checked={state.customerAgree}
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            {state.customerAgree &&
              !state.isPosting &&
              state.items.length > 0 && (
                <button type="submit" className="btn btn-outline-secondary">
                  Оформить
                </button>
              )}
          </form>
          {state.isPosting && <Preloader />}
          {state.errorMessage.trim() !== "" && (
            <ErrorMessage msg={state.errorMessage} />
          )}
          {state.successMessage.trim() !== "" && (
            <SuccessMessage msg={state.successMessage} />
          )}
        </div>
      </section>
    </>
  );
}
