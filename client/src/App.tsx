import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost"; 
import NotFound from "./pages/NotFound";
import CustomAppBar from "components/CustomAppBar";
import Logout from "./pages/Logout";
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Profile from "pages/Profile";
import Community from "pages/Community";

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
        <Route path="/post/:id" element={<PostDetails />} /> 
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
