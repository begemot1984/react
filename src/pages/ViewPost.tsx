import { useEffect, useState } from "react";
import type { Post } from "./AllPosts";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewPost() {
  const [post, setPost] = useState<Post>();
  const { id: postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7070/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
      });
  }, []);

  const onEditPost = () => navigate(`/posts/edit/${postId}`);

  const onDeletePost = () => {
    fetch(`http://localhost:7070/posts/${postId}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  return (
    <>
      {post && (
        <div>
          <h2>Просмотр поста</h2>
          <p>Created: {new Date(post.created).toLocaleDateString()} </p>
          <p>Content: {post.content} </p>
          <p>
            <button onClick={onEditPost}>Изменить</button>
            <button onClick={onDeletePost}>Удалить</button>
          </p>
        </div>
      )}
      {!post && (
        <div>
          <div>Пост {postId} не найден</div>
          <button onClick={() => navigate("/")}>На главную</button>
        </div>
      )}
    </>
  );
}
