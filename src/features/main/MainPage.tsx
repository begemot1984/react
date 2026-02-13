import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadServicesRequest } from "./mainSlice";
import { useEffect } from "react";
import ErrorBlock from "../error/ErrorBlock";

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.main;
  });

  useEffect(() => {
    dispatch(loadServicesRequest());
  }, []);

  return (
    <>
      {state.isLoading && <div>Loading...</div>}
      {state.error && <ErrorBlock error={state.error} />}
      {state.services &&
        state.services.map((s) => {
          return (
            <div key={s.id}>
              <span>
                {s.name}
                {" - "}
                {s.price}
              </span>
              <button onClick={() => navigate(`/${s.id}/details`)}>
                Детали
              </button>
            </div>
          );
        })}
    </>
  );
}
