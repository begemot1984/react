import { Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import HomePage from "./pages/HomePage";
import DriftPage from "./pages/DriftPage";
import TimeAttackPage from "./pages/TimeAttackPage";
import ForzaPage from "./pages/ForzaPage";

export default function App() {
  return (
    <div>
      <Menu />
      <div className="page">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/drift" Component={DriftPage} />
          <Route path="/timeattack" Component={TimeAttackPage} />
          <Route path="/forza" Component={ForzaPage} />
        </Routes>
      </div>
    </div>
  );
}
