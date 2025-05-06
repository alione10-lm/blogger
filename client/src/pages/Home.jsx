import React from "react";
import BlogCard from "../components/BlogCard";
import { BellRing, Bookmark, LogOut, User } from "lucide-react";
import Button from "../components/ui/Button";
import BlogForm from "../components/BlogForm";
import Modal from "../components/ui/Modal";
import Skeleton from "../components/ui/Skeleton";

import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../utils/api";
import { Link, useOutletContext } from "react-router-dom";

import Spinner from "../components/ui/FullSpinner";
import FullSpinner from "../components/ui/FullSpinner";
import UserAvatar from "../components/ui/UserAvatar";
import { useAuth } from "../contexts/authContext";
import useCurrentUser from "../hooks/useCurrentUser";
import UserSkeleton from "../components/ui/UserSkeleton";
import { checkIfTheUserHasLikedTheBlog } from "../services/helpers";

const Home = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  // const { mutate: logoutFn, isPending: isLoggingOut } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     toast.success("logged out");
  //     localStorage.removeItem("token");
  //     navigate("/");
  //   },
  //   onError: () => {
  //     toast.error("failed to logging out");
  //   },
  // });

  const { isGettingCurrentUser } = useCurrentUser();

  const { logoutFn, isLoggingOut } = useAuth();
  const { user } = useOutletContext();

  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full grid md:h-full md:grid-cols-4  gap-10 ">
      <div className="md:flex flex-col items-center   hidden  rounded-md h-fit  ">
        {isGettingCurrentUser ? (
          <UserSkeleton />
        ) : user?.user?.avatar ? (
          <img
            src={`http://localhost:5000/uploads/${user?.user?.avatar}`}
            alt="user name"
            title="user name"
            className=" size-[6rem] rounded-full mb-5"
          />
        ) : (
          // <UserAvatar
          //   size="large"
          //   firstname={user?.user?.firstName}
          //   lastname={user?.user?.lastName}
          // />
          ""
        )}

        <div className="text-center">
          <h1 className="text-slate-600 dark:text-gray-300  font-medium text-xl">
            {user?.user?.firstName} {user?.user?.lastName}
          </h1>
          <span className="text-indigo-500  text-sm">{user?.user?.email}</span>
        </div>
        <ul className="mt-10 text-sm dark:bg-dark-bg-1 p-2 rounded-lg">
          <Link to="../profile">
            <ListItem>
              <User size={15} />
              <button className="group-hover:cursor-pointer">
                personal profile
              </button>
            </ListItem>
          </Link>
          {/* <ListItem>
            <Bookmark size={15} />
            <button className="group-hover:cursor-pointer">saved items</button>
          </ListItem> */}
          <ListItem>
            <BellRing size={15} />
            <button className="group-hover:cursor-pointer">
              notifications
            </button>
          </ListItem>
          <ListItem>
            <LogOut size={15} />
            <button
              className="group-hover:cursor-pointer"
              onClick={() => logoutFn()}
            >
              {isLoggingOut ? <FullSpinner size="small" /> : "logout"}
            </button>
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
        {isLoading
          ? Array.from({ length: 5 }).map((_, ndx) => <Skeleton key={ndx} />)
          : blogs.map((blog) => (
              <BlogCard
                media={blog.media}
                comments={blog.comments}
                likes={blog.likes}
                key={blog._id}
                id={blog._id}
                createdBy={blog.createdBy}
                createdAt={blog.createdAt}
                description={blog.description}
                title={blog.title}
              />
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
  );
};

const ListItem = ({ children }) => {
  return (
    <li className="text-gray-500 group  dark:text-gray-200 flex dark:hover:bg-slate-100/6 hover:bg-indigo-50 py-1 px-3 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer  mb-1 items-center gap-5">
      {children}
    </li>
  );
};
export default Home;
