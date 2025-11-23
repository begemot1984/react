import "./App.css";
import { Stars } from "./components/Stars";

function App() {
  return (
    <>
      <Stars count={0} />
      <Stars count={1} />
      <Stars count={2} />
      <Stars count={3} />
      <Stars count={4} />
      <Stars count={5} />
      <Stars count={6} />
    </>
  );
}

export default App;
