import { useDispatch, useSelector } from "react-redux";
import { DELETE_JOB, START_EDIT_JOB, type JobListItem } from "../constants";

export default function JobList() {
  const dispatch = useDispatch();
  const [jobList, filter]: Array<JobListItem> = useSelector((state) => {
    return [state.job.jobList, state.job.filter];
  });

  function startEditJob(payload) {
    dispatch({
      type: START_EDIT_JOB,
      payload: payload,
    });
  }

  function deleteJob(payload) {
    dispatch({
      type: DELETE_JOB,
      payload: payload,
    });
  }

  return (
    <div>
      <ul>
        {jobList &&
          jobList
            .filter(
              (item) => filter.trim() == "" || item.job.includes(filter.trim()),
            )
            .map((item) => {
              return (
                <li key={item.job}>
                  {item.job} {item.price}{" "}
                  <button
                    onClick={() =>
                      startEditJob({
                        job: item.job,
                        price: item.price,
                      })
                    }
                  >
                    Редактировать
                  </button>
                  <button onClick={() => deleteJob({ job: item.job })}>
                    Удалить
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
