import { combineEpics, createEpicMiddleware } from "redux-observable";
import { detailsReducer } from "../features/details/detailsSlice";
import { mainReducer } from "../features/main/mainSlice";
import { configureStore } from "@reduxjs/toolkit";
import { loadDetailsEpic, loadServicesEpic } from "../epics";

const epicMiddlwware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    main: mainReducer,
    details: detailsReducer,
  },
  middleware: (getDefault) => getDefault().concat(epicMiddlwware),
});
epicMiddlwware.run(combineEpics(loadServicesEpic, loadDetailsEpic));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
