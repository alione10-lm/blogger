import React from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import useCurrentUser from "../hooks/useCurrentUser";

const AppLayout = () => {
  const { token } = useAuth();

  const { currentUser } = useCurrentUser();
  if (!token) return <Navigate to={"/auth"} />;

  return (
    <div className="flex flex-col dark:bg-dark-bg-2 h-[100dvh] w-full ">
      <Navbar />
      <main className="w-full transition-colors styled-scrollbar duration-300 dark:bg-dark-bg-2 dark:text-slate-300  h-full overflow-y-auto  md:p-2  md:px-20">
        <Outlet context={{ user: currentUser }} />
      </main>
    </div>
  );
};

export default AppLayout;
