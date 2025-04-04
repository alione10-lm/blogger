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

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"home"} replace />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/:id" element={<BlogDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
