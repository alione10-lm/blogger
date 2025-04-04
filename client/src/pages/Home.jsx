import React from "react";
import BlogCard from "../components/BlogCard";
import { BellRing, Bookmark, LogOut, User } from "lucide-react";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="w-full grid md:h-full md:grid-cols-4  gap-10">
      <div className="md:flex flex-col items-center  hidden  rounded-md h-fit  ">
        <img
          src="https://i.pravatar.cc/80?img=22"
          alt="user name"
          title="user name"
          width="80"
          height="80"
          class="max-w-full rounded-full mb-5"
        />
        <div className="text-center">
          <h1 className="text-slate-600  font-medium text-lg">john doe</h1>
          <span className="text-indigo-400 text-sm">web developer</span>
        </div>
        <ul className="mt-10 text-sm">
          <li className="text-gray-500 flex hover:bg-indigo-50 p-1 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer mb-1 items-center gap-5">
            <User size={15} />
            <span>personal profile</span>
          </li>
          <li className="text-gray-500 flex hover:bg-indigo-50 p-1 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer mb-1 items-center gap-5">
            <Bookmark size={15} />
            <span>saved items</span>
          </li>
          <li className="text-gray-500 flex hover:bg-indigo-50 p-1 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer mb-1  items-center gap-5">
            <BellRing size={15} />
            <span>notifications</span>
          </li>
          <li className="text-gray-500 flex hover:bg-indigo-50 px-2 py-1 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer mb-1 items-center gap-5">
            <LogOut size={15} />
            <span>logout</span>
          </li>
        </ul>
      </div>

      <div className="w-full md:overflow-y-scroll  md:h-full  col-span-2 ">
        {Array.from({ length: 10 }).map((_, ndx) => (
          <BlogCard key={ndx} />
        ))}
      </div>
      <form action="" className="hidden md:block">
        {["sports", "football", "education", "technologie"].map((item, ndx) => (
          <div key={ndx}>
            <input type="checkbox" />
            <label className="">{item}</label>
          </div>
        ))}
        <Button type="submit" size="small">
          aply filter
        </Button>
      </form>
    </div>
  );
};

export default Home;
