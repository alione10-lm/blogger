import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full overflow-y-auto h-screen  bg-cover bg-no-repeat  p-4 dark:bg-dark-bg-2  md:grid md:grid-cols-3 ">
      <Outlet />
      <div className="hidden md:block col-span-2 overflow-hidden bg-[url(/indigo.jpeg)] bg-no-repeat bg-cover rounded-lg"></div>
    </div>
  );
};

export default AuthLayout;
