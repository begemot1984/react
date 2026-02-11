import createSagaMiddleware from "redux-saga";
import { skillReducer } from "../features/skill/skillSlice";
import { configureStore } from "@reduxjs/toolkit";
import { saga } from "../saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    skill: skillReducer,
  },
  middleware: (getDefaultMiddlewware) =>
    getDefaultMiddlewware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
