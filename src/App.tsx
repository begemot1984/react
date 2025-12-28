import { useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import ClockList from "./components/ClockList";

export type ClockData = {
  name: string;
  zone: number;
};

export default function App() {
  const [clocks, setClocks] = useState<ClockData[]>([]);

  const replaceClock = (clock) => {
    setClocks((prevClocks) => {
      return prevClocks.filter((c) => c.name != clock.name).concat(clock);
    });
  };

  const deleteClock = (clock) => {
    setClocks((prevClocks) => {
      return prevClocks.filter((c) => c.name != clock.name);
    });
  };

  return (
    <>
      <AddForm onReplaceClock={replaceClock} />
      <ClockList clocks={clocks} onDeleteClock={deleteClock} />
    </>
  );
}
