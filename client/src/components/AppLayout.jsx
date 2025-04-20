import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col dark:bg-dark-bg-2 h-[100dvh] w-full ">
      <Navbar />
      <main className="w-full transition-colors styled-scrollbar duration-300 dark:bg-dark-bg-2 dark:text-slate-300  h-full overflow-y-auto  p-2  md:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
