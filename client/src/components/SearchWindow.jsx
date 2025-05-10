import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { search } from "../utils/api";
import UserSkeleton from "./ui/UserSkeleton";
import ProfileSkeleton from "./ui/ProfileSkeleton";
import { Link } from "react-router-dom";
import SearchUserSkeleton from "./ui/SearchUserSkeleton";
import UserAvatar from "./ui/UserAvatar";
import SearchBlogSkeleton from "./ui/SearchBlogSkeleton";

const SearchWindow = ({ close }) => {
  const [query, setQuery] = useState("");

  const [activeTab, setActiveTab] = useState("tab1");

  const {
    data: searchResult,
    isLoading: isSearching,
    error,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => (query.length >= 3 ? search(query) : null),
  });

  if (error) return <p>{error.message}</p>;
  return (
    <div className="flex items-center justify-center relative ">
      <div className="relative  max-w-md">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="serach"
          aria-label="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 input"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} stroke="oklch(58.5% 0.233 277.117)" />
        </div>
      </div>
      {query.length >= 3 && (
        <div className="absolute p-3 md:w-xl w-full bg-gray-100 shadow-lg dark:bg-dark-bg-1 z-100 rounded-lg overflow-hidden mt-1 top-[100%] ">
          <div className=" flex w-full gap-4 items-start  p-4">
            <button
              onClick={() => setActiveTab("tab1")}
              className={` cursor-pointer  text-center font-medium transition-colors duration-200 ${
                activeTab === "tab1"
                  ? "border-b-2 border-indigo-500 text-indigo-500"
                  : "text-gray-500 hover:text-indigo-500"
              }`}
            >
              users
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={`  cursor-pointer text-center font-medium transition-colors duration-200 ${
                activeTab === "tab2"
                  ? "border-b-2 border-indigo-500 text-indigo-500"
                  : "text-gray-500 hover:text-indigo-500"
              }`}
            >
              blogs
            </button>
          </div>

          <div className="text-gray-700 max-h-[25rem] min-h-30 styled-scrollbar overflow-y-auto dark:text-gray-300 ">
            {activeTab === "tab1" &&
              (isSearching ? (
                Array.from({ length: 3 }).map((_, ndx) => (
                  <SearchUserSkeleton key={ndx} />
                ))
              ) : searchResult?.users?.length === 0 ? (
                <span className="px-4 py-2 text-gray-500">
                  No results found
                </span>
              ) : (
                <ul className="">
                  {searchResult?.users?.map((user, ndx) => (
                    <UserItem
                      close={close}
                      setQuery={setQuery}
                      key={ndx}
                      avatar={user.avatar}
                      userId={user._id}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      email={user.email}
                    />
                  ))}
                </ul>
              ))}
            {activeTab === "tab2" &&
              (isSearching ? (
                Array.from({ length: 3 }).map((_, ndx) => (
                  <SearchBlogSkeleton key={ndx} />
                ))
              ) : searchResult?.blogs?.length === 0 ? (
                <span className="px-4 py-2 text-gray-500">
                  No results found
                </span>
              ) : (
                <ul className="">
                  {searchResult?.blogs?.map((blog, ndx) => (
                    <BlogItem
                      close={close}
                      setQuery={setQuery}
                      key={ndx}
                      blogId={blog._id}
                      title={blog.title}
                      description={blog.description}
                    />
                  ))}
                </ul>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWindow;
const UserItem = ({
  userId,
  avatar,
  firstName,
  lastName,
  email,
  setQuery,
  close,
}) => {
  return (
    <Link
      onClick={() => {
        setQuery("");
        close?.();
      }}
      to={`./users/${userId}`}
      className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-white transition-colors duration-200 dark:hover:bg-dark-bg-2"
    >
      <div className="shrink-0">
        {avatar ? (
          <img
            src={`http://localhost:5000/uploads/${avatar}`}
            alt="user name"
            className="max-w-full size-10 rounded-sm "
          />
        ) : (
          <UserAvatar
            firstname={firstName}
            size={"size-10"}
            lastname={lastName}
          />
        )}
      </div>
      <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
        <h4 className="text-base text-gray-700 dark:text-gray-200">
          {firstName} {lastName}
        </h4>
        <p className="w-full  text-sm text-gray-500 dark:text-gray-400 ">
          {email}
        </p>
      </div>
    </Link>
  );
};

const BlogItem = ({ blogId, title, description, setQuery }) => {
  return (
    <Link
      onClick={() => {
        setQuery("");
        close?.();
      }}
      to={`./blogs/${blogId}`}
      className="flex items-center rounded-md gap-4 px-4 py-3 hover:bg-white transition-colors duration-200 dark:hover:bg-dark-bg-2"
    >
      <div className="flex min-h-[2rem] flex-col items-start justify-center gap-0">
        <h4 className="text-base text-gray-700 dark:text-gray-200">{title}</h4>
        <p
          className="w-full text-sm text-gray-500 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Link>
  );
};
<ul className="divide-y divide-slate-100"></ul>;
