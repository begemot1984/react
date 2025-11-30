import { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({
    hex: "#9921ff",
    rgb: "rgb(153,33,255)",
  });

  const handleHexColorChange = (evt) => {
    const hexString: string = evt.target.value;
    if (hexString.length == 7 && hexString.startsWith("#")) {
      const hexPart = hexString.replace(/^#/, "");
      try {
        // parseInt парсит символы после F, это плохо? Проверим явно
        if (!hexPart.match(/[a-fA-F\d]{6}/)) {
          throw Error("Not hex string");
        }
        const hexNumber = parseInt(hexPart, 16);
        const r = (hexNumber >> 16) & 255;
        const g = (hexNumber >> 8) & 255;
        const b = hexNumber & 255;
        setState({
          ...state,
          hex: hexString,
          rgb: `rgb(${r}, ${g}, ${b})`,
        });
      } catch (error) {
        setState({
          ...state,
          hex: hexString,
          rgb: "Ошибка!",
        });
      }
    } else {
      setState({ ...state, hex: hexString });
    }
  };

  document.body.style = `background: ${state.rgb};`;

  return (
    <div className="converter">
      <div>
        <form>
          <input
            id="hex"
            name="hex"
            value={state.hex}
            onChange={handleHexColorChange}
          />
          <p />
          <input id="rgb" name="rgb" value={state.rgb} disabled />
        </form>
      </div>
    </div>
  );
}

export default App;
