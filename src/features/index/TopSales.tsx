import { useEffect } from "react";
import Preloader from "../common/Preloader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadTopSalesAsync } from "./topSalesSlice";
import { CatalogItems } from "../common/CatalogItems";

export default function TopSales() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(loadTopSalesAsync());
  }, [dispatch]);

  return (
    <>
      {state.isLoading && <Preloader />}
      {state.topSales.length !== 0 && (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <CatalogItems items={state.topSales} />
        </section>
      )}
    </>
  );
}
