import { put, spawn, debounce, takeLatest, retry } from "redux-saga/effects";
import {
  changeSearchField,
  searchSkillFail,
  searchSkillRequest,
  searchSkillReset,
  searchSkills,
  searchSkillSuccess,
} from "../features/skill/skillSlice";

function filterChangeSearchAction({ type, payload }) {
  return type === changeSearchField(payload).type;
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillRequest(action.payload));
}

function* watchChangeSearchSaga() {
  yield debounce(1000, filterChangeSearchAction, handleChangeSearchSaga);
}

function* handleSearchSkillSaga(action) {
  if (action.payload.trim() !== "") {
    try {
      const data = yield retry(3, 3 * 1000, searchSkills, action.payload);
      yield put(searchSkillSuccess(data));
    } catch (e) {
      yield put(searchSkillFail(e.message));
    }
  } else {
    yield put(searchSkillReset());
  }
}

function* watchSearchSkillSaga(payload) {
  yield takeLatest(searchSkillRequest(payload).type, handleSearchSkillSaga);
}

export function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillSaga);
}
