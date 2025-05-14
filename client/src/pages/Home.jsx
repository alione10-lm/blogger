import React from "react";
import BlogCard from "../components/BlogCard";
import { BellRing, Bookmark, LogOut, User } from "lucide-react";
import Button from "../components/ui/Button";
import BlogForm from "../components/BlogForm";
import Modal from "../components/ui/Modal";
import Skeleton from "../components/ui/Skeleton";

import { getAllBlogs } from "../utils/api";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";

import Spinner from "../components/ui/FullSpinner";
import FullSpinner from "../components/ui/FullSpinner";
import UserAvatar from "../components/ui/UserAvatar";
import { useAuth } from "../contexts/authContext";
import useCurrentUser from "../hooks/useCurrentUser";
import UserSkeleton from "../components/ui/UserSkeleton";

//

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BlogsFilter from "../components/BlogsFilter";

const Home = () => {
  const { isGettingCurrentUser } = useCurrentUser();
  const { logoutFn, isLoggingOut } = useAuth();
  const { user } = useOutletContext();

  const [searchParams, _] = useSearchParams();

  const filter = searchParams.get("filter") || "all";

  const {
    data,
    error: error,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs", filter],
    // queryFn: () => getAllBlogs(filter),
    queryFn: getAllBlogs,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  console.log(data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "error") return <div>{error.message}</div>;
  return (
    <div className="w-full grid md:h-full md:grid-cols-4  gap-10 ">
      <div className="md:flex flex-col items-center   hidden  rounded-md h-fit  ">
        {isGettingCurrentUser ? (
          <UserSkeleton />
        ) : user?.user?.avatar ? (
          <img
            src={user?.user?.avatar}
            // src={`http://localhost:5000/uploads/${user?.user?.avatar}`}
            alt="user name"
            title="user name"
            className=" size-30 rounded-full mb-5"
          />
        ) : (
          <UserAvatar
            rounded="rounded-full"
            size="size-20"
            firstname={user?.user?.firstName}
            lastname={user?.user?.lastName}
          />
        )}

        <div className="text-center">
          <h1 className="text-slate-600 dark:text-gray-300  font-medium text-xl">
            {user?.user?.firstName} {user?.user?.lastName}
          </h1>
          <span className="text-indigo-500  text-sm">{user?.user?.email}</span>
        </div>
        <ul className="mt-10 text-sm dark:bg-dark-bg-1 p-2 border dark:border-gray-800 border-gray-200 rounded-lg">
          <Link to="../profile">
            <ListItem>
              <User size={15} />
              <button className="group-hover:cursor-pointer">
                personal profile
              </button>
            </ListItem>
          </Link>

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
      <div className="w-full md:overflow-y-auto styled-scrollbar px-2 md:h-full  col-span-2 ">
        <div className="flex start mt-2 md:mt-0">
          <Modal>
            <Modal.Open opens="new-blog">
              <Button>new blog</Button>
            </Modal.Open>
            <Modal.Window name="new-blog">
              <BlogForm />
            </Modal.Window>
          </Modal>
        </div>
        <div className="w-full">
          {status === "pending"
            ? Array.from({ length: 5 }).map((_, ndx) => <Skeleton key={ndx} />)
            : data?.pages?.map((page) =>
                page.blogs.map((blog, ndx) => (
                  <BlogCard
                    media={blog.media}
                    comments={blog.comments}
                    likes={blog.likes}
                    key={ndx}
                    id={blog._id}
                    createdBy={blog.createdBy}
                    createdAt={blog.createdAt}
                    description={blog.description}
                    title={blog.title}
                  />
                ))
              )}
        </div>
        <div className="h-10 w-full" ref={ref}>
          {/* {isFetchingNextPage && <Skeleton />} */}
          {isFetchingNextPage && "loading more blogs ..."}
        </div>
      </div>
      <div className="hidden md:block">
        <BlogsFilter />
      </div>
    </div>
  );
};
//  data?.blogs.map((blog, ndx) => (
//                 <BlogCard
//                   media={blog.media}
//                   comments={blog.comments}
//                   likes={blog.likes}
//                   key={ndx}
//                   id={blog._id}
//                   createdBy={blog.createdBy}
//                   createdAt={blog.createdAt}
//                   description={blog.description}
//                   title={blog.title}
//                 />
//               ))
const ListItem = ({ children }) => {
  return (
    <li className="text-gray-500 group  dark:text-gray-200 flex dark:hover:bg-slate-100/6 hover:bg-indigo-50 py-1 px-3 hover:text-indigo-500 rounded-md transition-all duration-200 cursor-pointer  mb-1 items-center gap-5">
      {children}
    </li>
  );
};

export default Home;
