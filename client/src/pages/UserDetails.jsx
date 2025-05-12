import { useQuery } from "@tanstack/react-query";
import React, { useId } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getSingleUser } from "../utils/api";
import ProfileSkeleton from "../components/ui/ProfileSkeleton";
import { Navigate } from "react-router-dom";
import { formatBirthDay } from "../services/helpers";
import { Calendar, Mail, Notebook } from "lucide-react";
import BlogCard from "../components/BlogCard";
import EmptyBlogs from "../components/ui/EmptyBlogs";

const UserDetails = () => {
  const { userId } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["single-user", userId],
    queryFn: () => getSingleUser(userId),
  });

  const { user: CurrentUser } = useOutletContext();

  if (isLoading) return <ProfileSkeleton />;

  if (user._id === CurrentUser?.user?._id) return <Navigate to="../profile" />;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="w-full ">
      <div className="border mb-10 rounded-lg p-4  border-gray-300 dark:border-gray-700 ">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="w-full md:flex-row flex  flex-col md:gap-10">
            {user.avatar ? (
              <img
                src={`http://localhost:5000/uploads/${user.avatar}`}
                alt=""
                loading="lazy"
                className="rounded-lg md:size-50 size-20"
              />
            ) : (
              <span className="relative uppercase md:w-[5rem]  md:h-[5rem]  size-[4rem] md:mb-4 inline-flex items-center justify-center  text-lg text-white rounded bg-indigo-500">
                {`${user.firstName[0]} ${user.lastName[0]}`}
              </span>
            )}
            <div className="mt-5">
              <h1 className="capitalize mb-4 dark:text-slate-300  text-gray-600 font-medium text-2xl md:text-4xl">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <p className=" text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
                  <Mail size={20} className="stroke-indigo-600" />
                  {user.email}
                </p>
                <div className="size-2 bg-indigo-500 rounded-full" />
                <p className=" text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2 ">
                  <Calendar size={20} className="stroke-indigo-500" />
                  {formatBirthDay(user.birthDate)}
                </p>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {user.bio}
              </p>
              <p className=" text-gray-700 flex flex-col  w-fit items-center dark:text-gray-300">
                {user.blogs.length} blogs
              </p>
            </div>
          </div>
        )}
      </div>

      {user.blogs.length === 0 ? (
        <EmptyBlogs />
      ) : (
        <div className="md:w-2/3 w-full">
          {user.blogs?.map((blog) => (
            <BlogCard
              media={blog.media}
              key={blog._id}
              likes={blog.likes}
              comments={blog.comments}
              createdBy={blog.createdBy}
              createdAt={blog.createdAt}
              id={blog._id}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
