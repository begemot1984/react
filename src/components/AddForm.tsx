import { useDispatch, useSelector } from "react-redux";
import { ADD_JOB, SET_JOB, SET_PRICE } from "../constants";

export default function AddForm() {
  const dispatch = useDispatch();
  const { job, price } = useSelector((state) => {
    return state.job.current;
  });

  function addJob(e) {
    e.preventDefault();
    if (job.trim() != "" && price.trim() != "") {
      dispatch({
        type: ADD_JOB,
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

  return (
    <div>
      <form onSubmit={addJob}>
        <input id="job" type="text" value={job} onChange={setJob} />
        <input id="price" type="text" value={price} onChange={setPrice} />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
