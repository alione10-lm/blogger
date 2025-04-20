import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import BlogDetails from "./pages/BlogDetails";

import BlogForm from "./components/BlogForm";
import AppLayout from "./components/AppLayout";
import ThemeContextPrvider from "./contexts/ThemeContext";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <ThemeContextPrvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="auth/login" replace />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
          </Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"home"} replace />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />}>
              <Route path="saved" element={<p>saved</p>} />
            </Route>
            <Route path="admin" element={<AdminPanel />} />
            <Route path="blog/:id" element={<BlogDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextPrvider>
  );
}

export default App;
