import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [navigate]);
};

export default useAuth;
