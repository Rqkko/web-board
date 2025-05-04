import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import CustomAppBar from "components/CustomAppBar";
import Logout from "./pages/Logout";

function PostWrapper() {
  const { postId } = useParams<{ postId: string }>(); // Extract postId from the URL

  return <Post postId={postId} />;
}

function App() {
  const location = useLocation();
  const hideAppBar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideAppBar && <CustomAppBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post/:postId" element={<PostWrapper />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;