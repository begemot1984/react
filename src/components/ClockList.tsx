import Clock from "./Clock";

export default function ClockList({ clocks, onDeleteClock }) {
  return (
    <div>
      {clocks.map((clock) => {
        return (
          <Clock
            key={clock.name + clock.zone} // нужен другой key, чтобы при замене name с другим zone заново произошёл render
            clock={clock}
            onDeleteClock={onDeleteClock}
          />
        );
      })}
    </div>
  );
}
