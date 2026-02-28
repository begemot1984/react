import TopSales from "./TopSales";
import { Catalog } from "../catalog/Catalog";
import { useEffect } from "react";
import { highlightActiveMenuItem } from "../header/headerSlice";
import { CATEGORY_ID_ALL, MENU_ITEM_INDEX } from "../common/constants";
import { useAppDispatch } from "../../app/hooks";
import { setCatalogLoadParams } from "../catalog/catalogSlice";

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(highlightActiveMenuItem(MENU_ITEM_INDEX));
    dispatch(
      setCatalogLoadParams({
        query: "",
        category: CATEGORY_ID_ALL,
        offset: 0,
        resetItems: true,
      }),
    );
  });

  return (
    <>
      <TopSales />
      <Catalog isStandalone={false} />
    </>
  );
}
