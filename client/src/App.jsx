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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useThemeContext } from "./contexts/ThemeContext";
import clsx from "clsx";
import useViewportWidth from "./hooks/useViewportWidth";
import AuthProvider from "./contexts/authContext";

import ProtectedRoutes from "./components/ProtectedRoutes";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { theme } = useThemeContext();

  const width = useViewportWidth();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position={clsx(width <= 300 ? "top-right" : "bottom-right")}
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: clsx(theme === "dark" ? "#36363627" : "white"),
            color: clsx(theme === "dark" ? "#ccc" : "#363636"),
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="blog/:blogId" element={<BlogDetails />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
