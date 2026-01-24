import {
  ADD_JOB,
  CANCEL_EDIT_JOB,
  DELETE_JOB,
  FORM_TYPE_ADD,
  FORM_TYPE_EDIT,
  SET_JOB,
  SET_PRICE,
  START_EDIT_JOB,
  UPDATE_JOB,
  type JobListItem,
  type State,
} from "../constants";

const initState: State = {
  current: {
    job: "",
    price: "",
  },
  formType: FORM_TYPE_ADD,
  jobList: new Array<JobListItem>(),
};

export const jobReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        current: {
          ...state.current,
          job: action.payload,
        },
      };

    case SET_PRICE:
      return {
        ...state,
        current: {
          ...state.current,
          price: action.payload,
        },
      };

    case ADD_JOB:
      state.jobList.push(action.payload);
      return {
        ...state,
        current: {
          job: "",
          price: "",
        },
      };

    case UPDATE_JOB:
      return {
        ...state,
        current: {
          job: "",
          price: "",
        },
        formType: FORM_TYPE_ADD,
        jobList: state.jobList.map((item) => {
          if (item.job == action.payload.job) {
            return {
              job: item.job,
              price: action.payload.price,
            };
          } else {
            return item;
          }
        }),
      };

    case DELETE_JOB:
      return {
        ...state,
        formType: FORM_TYPE_ADD,
        jobList: state.jobList.filter((item) => item.job != action.payload.job),
      };

    case START_EDIT_JOB:
      return {
        ...state,
        current: action.payload,
        formType: FORM_TYPE_EDIT,
      };

    case CANCEL_EDIT_JOB:
      return {
        ...state,
        current: {
          job: "",
          price: "",
        },
        formType: FORM_TYPE_ADD,
      };

    default:
      return state;
  }
};
