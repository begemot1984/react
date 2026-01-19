import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const onChangeContent = (evt) => {
    evt.preventDefault();
    setContent(evt.target.value);
  };

  const onCancel = () => navigate("/");

  const onCreatePost = () => {
    if (content.trim() != "") {
      fetch("http://localhost:7070/posts", {
        method: "POST",
        body: JSON.stringify({ content: content }),
      });
      setContent("");
      navigate("/");
    }
  };

  return (
    <>
      <h2>Создать пост</h2>
      <form>
        <p>
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            onChange={onChangeContent}
            value={content}
          />
        </p>
        <p>
          <button onClick={onCreatePost}>Сохранить</button>
          <button onClick={onCancel}>Отменить</button>
        </p>
      </form>
    </>
  );
}
