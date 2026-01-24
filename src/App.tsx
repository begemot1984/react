import { useSelector } from "react-redux";
import "./App.css";
import { FORM_TYPE_ADD, FORM_TYPE_EDIT } from "./constants";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import JobList from "./components/JobList";

export default function App() {
  const job = useSelector((state) => {
    return state.job;
  });

  return (
    <>
      {job.formType == FORM_TYPE_ADD && <AddForm />}
      {job.formType == FORM_TYPE_EDIT && <EditForm />}
      <JobList />
    </>
  );
}
