import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./features/search/SearchPage.tsx";
import FilmPage from "./features/film/FilmPage.tsx";
import FavouritePage from "./features/favourite/FavouritePage.tsx";
import { store } from "./app/store.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*/search",
        element: <SearchPage />,
      },
      {
        path: "*/film",
        element: <FilmPage />,
      },
      {
        path: "*/favourite",
        element: <FavouritePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
