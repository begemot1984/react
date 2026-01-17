import "./App.css";
import GetLoading from "./components/GetLoading";
import GetError from "./components/GetError";
import GetData from "./components/GetData";

function App() {
  return (
    <>
      <GetData />
      <GetError />
      <GetLoading />
    </>
  );
}

export default App;
