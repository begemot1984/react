import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { highlightActiveMenuItem } from "../header/headerSlice";

export default function NotFound() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(highlightActiveMenuItem(""));
  });

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Страница не найдена</h2>
        <p>Извините, такая страница не найдена!</p>
      </section>
    </>
  );
}
