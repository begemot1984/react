import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AllPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetch("http://localhost:7070/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <>
      <div>
        <button onClick={() => navigate("/posts/new")}>Создать пост</button>
      </div>
      {posts && (
        <div>
          <h2>Список постов</h2>
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <p>Created: {new Date(post.created).toLocaleDateString()} </p>
              <p>Content: {post.content} </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export type Post = {
  id: number;
  content: string;
  created: number;
};
