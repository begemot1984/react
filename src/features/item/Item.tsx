import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Preloader from "../common/Preloader";
import { resetActiveMenuItem } from "../header/headerSlice";

export default function Item() {
  // TODO: show NotFound page if server returned 404
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetActiveMenuItem());
  });

  return (
    <>
      <Preloader />
    </>
  );
}
