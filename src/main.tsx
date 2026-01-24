import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { combineReducers, compose, legacy_createStore } from "redux";
import { jobReducer } from "./redux/jobReducer.tsx";

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function confStore() {
  return legacy_createStore(
    combineReducers({ job: jobReducer }),
    compose(ReactReduxDevTools),
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={confStore()}>
      <App />
    </Provider>
  </StrictMode>,
);
