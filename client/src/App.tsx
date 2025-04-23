import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "pages/Post";
import NotFound from "./pages/NotFound";
import { AppBar } from "@mui/material";
import Signup from "pages/Signup";

function PostWrapper() {
  const { postId } = useParams<{ postId: string }>(); // Extract postId from the URL

  return <Post postId={postId} />;
}

function App() {
  return (
    <>
      <AppBar>This is the App Bar, this will stay on every page</AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:postId" element={<PostWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;