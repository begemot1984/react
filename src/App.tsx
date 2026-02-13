import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./features/main/MainPage";
import DetailsPage from "./features/details/DetailsPage";

function App() {
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path={"/:id/details"} element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
