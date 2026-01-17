import { useState, useEffect } from "react";

export function List({ onClickUser }) {
  const [users, setUsers] = useState<ListItem[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json",
    )
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <button onClick={() => onClickUser(u.id)}>{u.name}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

type ListItem = {
  id: number;
  name: string;
};
