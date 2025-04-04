import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full ">
      <Navbar />
      <main className="w-full h-full overflow-y-scroll p-2  md:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
