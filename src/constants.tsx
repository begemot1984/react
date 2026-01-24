export type JobListItem = {
  job: "";
  price: "";
};

export type State = {
  current: JobListItem;
  formType: string;
  jobList: JobListItem[];
};

export const SET_JOB = "SET_JOB";
export const SET_PRICE = "SET_PRICE";
export const ADD_JOB = "ADD_JOB";
export const UPDATE_JOB = "UPDATE_JOB";
export const DELETE_JOB = "DELETE_JOB";
export const START_EDIT_JOB = "START_EDIT_JOB";
export const CANCEL_EDIT_JOB = "CANCEL_EDIT_JOB";
export const FORM_TYPE_ADD = "add";
export const FORM_TYPE_EDIT = "edit";
