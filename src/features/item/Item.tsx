import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Preloader from "../common/Preloader";
import { setActiveMenuItem } from "../header/headerSlice";

export default function Item() {
  // TODO: show NotFound page if server returned 404, Preloader,
  //       error message on other load error
  //       (or just error message for all, remove NotFound page?)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveMenuItem(""));
  });

  return (
    <>
      <Preloader />
    </>
  );
}
