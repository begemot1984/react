import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "./AllPosts";

export default function EditPost() {
  const [content, setContent] = useState<string>();
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const onCancel = () => navigate(`/posts/${postId}`);

  useEffect(() => {
    fetch(`http://localhost:7070/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data.post.content);
      });
  }, []);

  const onChangeContent = (evt) => {
    evt.preventDefault();
    setContent(evt.target.value);
  };

  const onEditPost = () => {
    fetch(`http://localhost:7070/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ content: content }),
    });
    navigate(`/posts/${postId}`);
  };

  // нет content = нет поста
  return (
    <>
      {content && (
        <div>
          <h2>Изменить пост</h2>
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
            <button onClick={onEditPost}>Сохранить</button>
            <button onClick={onCancel}>Отменить</button>
          </p>
        </div>
      )}
      {!content && (
        <div>
          <div>Пост {postId} не найден</div>
          <button onClick={onCancel}>На главную</button>
        </div>
      )}
    </>
  );
}
