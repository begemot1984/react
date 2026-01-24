import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { FILTER, FORM_TYPE_ADD, FORM_TYPE_EDIT } from "./constants";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import JobList from "./components/JobList";

export default function App() {
  const dispatch = useDispatch();
  const job = useSelector((state) => {
    return state.job;
  });

  function filterChanged(e) {
    dispatch({
      type: FILTER,
      payload: e.target.value,
    });
  }

  return (
    <>
      {job.formType == FORM_TYPE_ADD && <AddForm />}
      {job.formType == FORM_TYPE_EDIT && <EditForm />}
      <div>
        Фильтр:{" "}
        <input type="text" onChange={filterChanged} value={job.filter} />
      </div>
      <JobList />
    </>
  );
}
