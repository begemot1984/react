import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadDetailsRequest } from "./detailsSlice";
import { useEffect } from "react";
import ErrorBlock from "../error/ErrorBlock";

export default function DetailsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.details;
  });
  const { id: serviceId } = useParams();

  useEffect(() => {
    dispatch(loadDetailsRequest(serviceId || ""));
  }, []);

  function showDetails() {
    return (
      <>
        <div>Название: {state.details?.name}</div>
        <div>Цена: {state.details?.price}</div>
        <div>Описание: {state.details?.content}</div>
        <div>
          <button onClick={() => navigate("/")}>На главную</button>
        </div>
      </>
    );
  }

  return (
    <>
      {state.isLoading && <div>Loading...</div>}
      {state.error && <ErrorBlock error={state.error} />}
      {state.details && showDetails()}
    </>
  );
}
