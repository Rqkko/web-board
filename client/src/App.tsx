import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "pages/Post";

function PostWrapper() {
  const { postId } = useParams<{ postId: string }>(); // Extract postId from the URL

  return <Post postId={postId} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<PostWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;