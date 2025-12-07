import "./App.css";
import { CardWithImage } from "./components/CardWithImage.tsx";
import reactLogo from "./assets/react.svg";
import { CardGeneric } from "./components/CardGeneric.tsx";

function App() {
  return (
    <>
      <CardWithImage
        title="Card with image"
        text="Text with image"
        link="Go"
        image={reactLogo}
      />
      <CardGeneric title="Card generic" text="Text generic" link="Go" />
    </>
  );
}

export default App;
