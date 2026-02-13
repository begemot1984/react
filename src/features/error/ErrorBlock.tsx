import { useNavigate } from "react-router-dom";

export default function ErrorBlock({ error }) {
  const navigate = useNavigate();

  return (
    <>
      <div>Ошибка: {error}</div>
      <button onClick={() => navigate(0)}>Повторить запрос</button>
    </>
  );
}
