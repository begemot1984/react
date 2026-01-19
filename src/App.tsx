import { Outlet, Route, Routes } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path={"/posts/:id"} element={<ViewPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}
