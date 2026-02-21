import TopSales from "./TopSales";
import { Catalog } from "../catalog/Catalog";
import { useEffect } from "react";
import { setActiveMenuItem } from "../header/headerSlice";
import { MENU_ITEM_INDEX } from "../common/constants";
import { useAppDispatch } from "../../app/hooks";

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveMenuItem(MENU_ITEM_INDEX));
  });

  return (
    <>
      <TopSales />
      <Catalog search={false} />
    </>
  );
}
