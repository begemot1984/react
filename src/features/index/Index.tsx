import TopSales from "./TopSales";
import { Catalog } from "../catalog/Catalog";
import { useEffect } from "react";
import { highlightActiveMenuItem } from "../header/headerSlice";
import { MENU_ITEM_INDEX } from "../common/constants";
import { useAppDispatch } from "../../app/hooks";

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(highlightActiveMenuItem(MENU_ITEM_INDEX));
  });

  return (
    <>
      <TopSales />
      <Catalog isStandalone={false} />
    </>
  );
}
