import { useState } from "react";
import { format, parse } from "date-fns";
import "./App.css";

function dateMatch(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
}

function roundDistance2Meter(dist: number): number {
  return Math.round(dist * 1000) / 1000;
}

function App() {
  const [form, setForm] = useState({
    when: "",
    dist: "",
  });
  const [trains, setTrains] = useState<[Date, number][]>([[new Date(), 1]]);

  const fmt = "dd.MM.yy";

  // запомнить значения полей формы для addItem
  const updateForm = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  // добавить/обновить тренировку
  const addItem = (evt) => {
    evt.preventDefault();
    const newWhenDate = parse(form.when, fmt, new Date());
    if (isNaN(newWhenDate.getTime())) {
      console.log(`Invalid date: ${form.when}`);
      return;
    }
    const newDistNum = parseFloat(form.dist);
    if (isNaN(newDistNum)) {
      console.log(`Invalid distance: ${form.dist}`);
      return;
    }
    setTrains((prevTrains) => {
      let updated = false;
      const newTrains: [Date, number][] = prevTrains.map(([when, dist]) => {
        let distUpdated = dist;
        if (dateMatch(when, newWhenDate)) {
          distUpdated += newDistNum;
          updated = true;
        }
        return [when, roundDistance2Meter(distUpdated)];
      });
      if (!updated) {
        newTrains.push([newWhenDate, roundDistance2Meter(newDistNum)]);
      }
      return newTrains;
    });
  };

  // удалить тренировку
  const delItem = ({ target }) => {
    const delWhenDate = parse(target.name, fmt, new Date());
    setTrains((prevTrains) =>
      prevTrains.filter(([when, _]) => !dateMatch(when, delWhenDate))
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={addItem}>
        <div className="form-group">
          <label htmlFor="when">Дата (ДД.ММ.ГГГГ):</label>
          <input
            type="text"
            id="when"
            name="when"
            value={form.when}
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dist">Пройдено км:</label>
          <input
            type="text"
            id="dist"
            name="dist"
            value={form.dist}
            onChange={updateForm}
          />
          <button type="submit">Добавить</button>
        </div>
      </form>
      <div className="data-list">
        {trains
          .sort((a, b) => {
            let result = -1; // по убыванию
            if (a[0] < b[0]) {
              result = 1;
            } else if (a[0] == b[0]) {
              result = 0;
            }
            return result;
          })
          .map(([when, dist]) => {
            const key = format(when, fmt);
            return (
              <div key={key} className="data-item">
                <span>{key}</span>
                <span>{dist}</span>
                <button
                  type="submit"
                  className="delete-button"
                  id={key}
                  name={key}
                  onClick={delItem}
                >
                  ✖
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
