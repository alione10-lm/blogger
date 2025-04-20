import React from "react";
import BlogCard from "../components/BlogCard";
import { BellRing, Bookmark, LogOut, User } from "lucide-react";
import Button from "../components/ui/Button";
import BlogForm from "../components/BlogForm";
import Modal from "../components/ui/Modal";

const Home = () => {
  return (
    <>
      <div className="w-full grid md:h-full md:grid-cols-4  gap-10 ">
        <div className="md:flex flex-col items-center   hidden  rounded-md h-fit  ">
          <img
            src="https://i.pravatar.cc/80?img=22"
            alt="user name"
            title="user name"
            width="80"
            height="80"
            className="max-w-full rounded-full mb-5"
          />
          <div className="text-center">
            <h1 className="text-slate-600 dark:text-gray-300  font-medium text-xl">
              john doe
            </h1>
            <span className="text-indigo-500  text-sm">web developer</span>
          </div>
          <ul className="mt-10 text-sm dark:bg-dark-bg-1 p-2 rounded-lg">
            <ListItem>
              <User size={15} />
              <span>personal profile</span>
            </ListItem>
            <ListItem>
              <Bookmark size={15} />
              <span>saved items</span>
            </ListItem>
            <ListItem>
              <BellRing size={15} />
              <span>notifications</span>
            </ListItem>
            <ListItem>
              <LogOut size={15} />
              <span>logout</span>
            </ListItem>
          </ul>
        </div>
        <div className="w-full md:overflow-y-scroll styled-scrollbar px-2 md:h-full  col-span-2 ">
          <div className="flex start">
            <Modal>
              <Modal.Open opens="new-blog">
                <Button>new blog</Button>
              </Modal.Open>
              <Modal.Window name="new-blog">
                <BlogForm />
              </Modal.Window>
            </Modal>
          </div>
          {Array.from({ length: 10 }).map((_, ndx) => (
            <BlogCard key={ndx} />
          ))}
        </div>
        <form
          action=""
          className="hidden dark:bg-dark-bg-1 p-3 h-fit w-2/3 rounded-lg md:block"
        >
          <div className="mb-5">
            {["sports", "football", "education", "technologie"].map(
              (item, ndx) => (
                <div key={ndx} className="flex items-center gap-2 ">
                  <input type="checkbox" />
                  <label className="text-slate-700 dark:text-gray-300">
                    {item}
                  </label>
                </div>
              )
            )}
          </div>
          <Button type="submit" size="small">
            apply filter
          </Button>
        </form>
      </div>
    </>
  );
};

const ListItem = ({ children }) => {
  return (
    <li className="text-gray-500 dark:text-gray-200 flex dark:hover:bg-slate-100/6 hover:bg-indigo-50 py-1 px-3 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer mb-1 items-center gap-5">
      {children}
    </li>
  );
};
export default Home;
