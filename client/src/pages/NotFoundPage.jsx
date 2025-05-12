import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className=" flex flex-col  items-center h-[100%] justify-center text-center p-4">
      <img src="/nfp-draw.svg" className="md:size-100 size-50" alt="" />
      <h1 className="text-7xl  font-bold text-indigo-600">404</h1>
      <p className="text-2xl mt-4 dark:text-gray-300 text-gray-700">
        Oops! Page not found.
      </p>
      <Link
        to="/app"
        className="mt-6 px-6 flex  group items-center gap-2 py-2 bg-indigo-500 hover:bg-indigo-600 text-indigo-50 rounded-md transition duration-300"
      >
        <ArrowLeft
          className="group-hover:-translate-x-2 transition-all duration-300"
          size={20}
        />
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
