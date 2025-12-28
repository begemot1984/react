import { useState } from "react";
import "./AddForm.css";

export default function AddForm({ onReplaceClock }) {
  const emptyForm = {
    name: "",
    zone: "",
  };

  const [form, setForm] = useState(emptyForm);

  const updateForm = ({ target }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  const submitForm = (evt) => {
    evt.preventDefault();

    const { name, zone } = form;
    if (name == undefined || name == null || name.trim() == "") {
      console.error("empty name");
    } else if (zone == undefined || zone == null || zone.trim() == "") {
      console.error("empty zone");
    } else {
      const zoneInt = parseInt(zone);
      if (Number.isNaN(zoneInt) || zoneInt < -12 || zoneInt > 12) {
        console.error("invalid zone");
      } else {
        onReplaceClock({
          name: name.trim(),
          zone: zoneInt,
        });
      }
    }

    setForm(emptyForm);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Название:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          className="add-form-element"
          onChange={updateForm}
        />
        <label htmlFor="zone">Временная зона:</label>
        <input
          id="zone"
          name="zone"
          type="text"
          value={form.zone}
          className="add-form-element"
          onChange={updateForm}
        />
        <button type="submit" id="add" name="add" className="add-form-element">
          Добавить
        </button>
      </form>
    </div>
  );
}
