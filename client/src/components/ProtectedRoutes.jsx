import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = () => {
  const user = useAuth();

  console.log(user);
  if (!user.token) return <Navigate to="/auth" />;
  return <Outlet />;
};

export default PrivateRoute;
