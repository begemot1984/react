import { useDispatch, useSelector } from "react-redux";
import { CANCEL_EDIT_JOB, SET_JOB, SET_PRICE, UPDATE_JOB } from "../constants";

export default function EditForm() {
  const dispatch = useDispatch();
  const { job, price } = useSelector((state) => {
    return state.job.current;
  });

  function updateJob(e) {
    e.preventDefault();
    if (job.trim() != "" && price.trim() != "") {
      dispatch({
        type: UPDATE_JOB,
        payload: {
          job: job,
          price: price,
        },
      });
    }
  }

  function setJob(e) {
    dispatch({
      type: SET_JOB,
      payload: e.target.value,
    });
  }

  function setPrice(e) {
    dispatch({
      type: SET_PRICE,
      payload: e.target.value,
    });
  }

  function cancelEditJob(e) {
    e.preventDefault();
    dispatch({
      type: CANCEL_EDIT_JOB,
    });
  }

  return (
    <div>
      <form onSubmit={updateJob}>
        <input id="job" type="text" value={job} onChange={setJob} />
        <input id="price" type="text" value={price} onChange={setPrice} />
        <button type="submit">Сохранить</button>
        <button onClick={cancelEditJob}>Отменить</button>
      </form>
    </div>
  );
}
