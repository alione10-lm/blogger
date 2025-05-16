import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../utils/api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const { mutate: LoginFn, isPending: isLoginIn } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("last-check", Date.now());

      toast.success("login in");
      navigate("/app");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: logoutFn, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("logged out");
      localStorage.removeItem("token");
      navigate("/");
      localStorage.removeItem("last-check");
    },
    onError: () => {
      toast.error("failed to logging out");
    },
  });

  return (
    <AuthContext.Provider
      value={{ token, LoginFn, logoutFn, isLoggingOut, isLoginIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
