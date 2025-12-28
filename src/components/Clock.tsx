import { useEffect, useState } from "react";
import moment from "moment";
import "./Clock.css";

export default function Clock({ clock, onDeleteClock }) {
  const now = () => moment().utcOffset(clock.zone, false); // текущее время в указанной зоне

  const [time, setTime] = useState<moment.Moment>(now());

  useEffect(() => {
    const interval = window.setInterval(() => setTime(now()), 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="clock">
      {clock.name + ": "}
      {[time.hour(), time.minute(), time.second()]
        .map((n) => n.toString().padStart(2, "0"))
        .join(":")}
      <button className="button-del" onClick={() => onDeleteClock(clock)}>
        Удалить
      </button>
    </div>
  );
}
