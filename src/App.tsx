import { useEffect, useState } from "react";
import "./App.css";

export type Note = {
  id: number;
  content: string;
};

export default function App() {
  const url = "http://localhost:7070/notes";
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const getNotes = () => {
    fetch(url)
      .then((r) => r.json())
      .then(setNotes);
  };

  const deleteNote = (id: number) => {
    fetch(`${url}/${id}`, { method: "DELETE" }).then(() => getNotes());
  };

  const onSetNewNote = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 0, content: newNote }),
    }).then(() => getNotes());
    setNewNote("");
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h2>Notes</h2>
      <button onClick={getNotes}>Обновить</button>
      {notes.map((note) => {
        return (
          <div className="note" key={note.id}>
            <input readOnly value={note.content} />
            <button className="del" onClick={() => deleteNote(note.id)}>
              Удалить
            </button>
          </div>
        );
      })}
      <div>
        <label className="note" htmlFor="new-note">
          New note:
        </label>
        <input
          className="note upd"
          id="new-note"
          onChange={onSetNewNote}
          value={newNote}
        />
        <button className="add" onClick={addNote}>
          Добавить
        </button>
      </div>
    </>
  );
}
