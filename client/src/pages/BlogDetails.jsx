import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getSingleBlog } from "../utils/api";
import FullSpinner from "../components/ui/FullSpinner";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/ui/Skeleton";
import {
  checkIfTheUserHasLikedTheBlog,
  TimeFromNow,
} from "../services/helpers";
import {
  Ban,
  Check,
  Copy,
  Heart,
  MessageCircle,
  Share2,
  SquareArrowOutUpRight,
} from "lucide-react";
import Comments from "../components/Comments";
import Modal from "../components/ui/Modal";
import UserAvatar from "../components/ui/UserAvatar";

const BlogDetails = ({ isCurrentUser = false }) => {
  const { blogId } = useParams();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-single-blog", blogId],
    queryFn: () => getSingleBlog(blogId),
  });

  console.log(blog);

  const [like, setLike] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);

  const [copyStatus, setCopyStatus] = useState("");

  const toggleLike = () => {
    setLike((like) => !like);
  };

  const toggleComments = () => {
    setIsOpenComments((open) => !open);
  };

  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopyStatus("copied");
      })
      .catch(() => {
        setCopyStatus("not-copied");
      });
  };
  console.log(error);
  if (isLoading) return <Skeleton />;
  if (error) return <p>{error.message}</p>;

  const {
    createdBy,
    createdAt,
    _id: id,
    title,
    description,
    likes,
    comments,
    media,
  } = blog;

  // console.log(likes);
  return (
    <div className="w-full grid grid-cols-1  md:px-0 px-2 items-start ">
      {/* <div className="overflow-hidden  md:col-span-2 border border-gray-200 dark:border-gray-800 rounded-lg text-slate-500  p-2 ">
        <div className="w-full flex items-center justify-between">
          <header className="flex gap-4">
            <Link to={`../users/${createdBy._id}`}>
              {createdBy.avatar ? (
                <img
                  src={`http://localhost:5000/uploads/${createdBy.avatar}`}
                  alt="user name"
                  title={`${createdBy.firstName}  ${createdBy.lastName}`}
                  className="max-w-full size-[3rem] rounded-lg cursor-pointer"
                />
              ) : (
                <UserAvatar
                  size="size-[2rem]"
                  firstname={createdBy.firstName}
                  lastname={createdBy.lastName}
                />
              )}
            </Link>
            <div>
              <h3 className="text-lg md:text-xl font-medium  dark:text-slate-200 text-slate-600">
                {title}
              </h3>
              <p className="text-sm  text-indigo-500/100">
                by {createdBy?.firstName} {createdBy?.lastName} ,{" "}
                {TimeFromNow(createdAt)}
              </p>
            </div>
          </header>
          {isCurrentUser && (
            <div className="flex items-center  gap-4">
              <Modal>
                <Modal.Open opens="delete">
                  <Trash size={20} cursor="pointer" className="" />
                </Modal.Open>
                <Modal.Window name="delete">
                  <BlogOperations />
                </Modal.Window>
              </Modal>
              <Pen size={20} cursor="pointer" className="" />
            </div>
          )}
        </div>

        <div
          className="description py-6 dark:text-gray-300 text-sm md:text-[1rem]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {media &&
          (media.endsWith("mp4") ? (
            <video width="640" height="360" controls>
              <source
                src={`http://localhost:5000/uploads/${media}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={`http://localhost:5000/uploads/${media}`}
              alt="card image"
              className="aspect-video w-full  rounded-lg  "
            />
          ))}

        <div className="w-full flex gap-4 p-2 justify-end ">
          <button
            onClick={() => toggleLike()}
            className="flex flex-col items-center"
          >
            <Heart
              stroke="#ef4444"
              size={20}
              fill={like ? "red" : "transparent"}
              className="cursor-pointer"
            />
            <span className="text-[0.6rem] text-red-500">
              {" "}
              {likes.length} likes
            </span>
          </button>
          <button
            className="flex flex-col items-center"
            onClick={() => toggleComments()}
          >
            <MessageCircle
              size={20}
              stroke="#10b981"
              className="cursor-pointer"
            />
            <span className="text-[0.6rem] text-green-500">
              {comments.length} comments
            </span>
          </button>

          <Modal>
            <Modal.Open>
              <div>
                <button className="flex flex-col items-center">
                  <Share2
                    size={20}
                    stroke="#6366f1"
                    className=" cursor-pointer"
                  />
                  <span className="text-[0.6rem] text-indigo-500">shares</span>
                </button>
              </div>
            </Modal.Open>
            <Modal.Window>
              <div className="flex bg-gray-50 gap-4 dark:bg-gray-100/6 p-4 mt-10 rounded-lg items-center justify-center">
                <p className="text-indigo-500 text-sm ">
                  {`http://localhost:5173/app/blogs/${id}`}
                </p>
                <button
                  onClick={() =>
                    handleCopy(`http://localhost:5173/app/blogs/${id}`)
                  }
                >
                  {copyStatus === "copied" && (
                    <Check className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
                  )}
                  {copyStatus === "not-copied" && (
                    <Ban className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
                  )}
                  {copyStatus === "" && (
                    <Copy className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
                  )}
                </button>
              </div>
            </Modal.Window>
          </Modal>
          <Link className="flex flex-col items-center" to={`../blog/${id}`}>
            <SquareArrowOutUpRight
              size={20}
              stroke="#6366f1"
              className=" cursor-pointer"
            />
            <span className="text-[0.6rem] text-indigo-500">overview</span>
          </Link>
        </div>
      </div> */}
      {/* <Comments blogId={id} comments={comments} /> */}
      <BlogCard
        likes={likes}
        comments={comments}
        createdBy={createdBy}
        createdAt={createdAt}
        media={media}
        title={title}
        description={description}
        id={id}
        isOverview={true}
      />
    </div>
  );
};

export default BlogDetails;
