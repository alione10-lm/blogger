import {
  Ban,
  Check,
  Copy,
  Heart,
  MessageCircle,
  Pen,
  Share2,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import Comments from "./Comments";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

import { Link, useOutletContext } from "react-router-dom";
import {
  checkIfTheUserHasLikedTheBlog,
  TimeFromNow,
} from "../services/helpers";
import UserAvatar from "./ui/UserAvatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, LikeBlog } from "../utils/api";
import toast from "react-hot-toast";
import FullSpinner from "./ui/FullSpinner";
import AnimatedHeart from "./ui/AnimatedHeart";
import BlogForm from "./BlogForm";

export default function BlogCard({
  isCurrentUser = false,
  title,
  description,
  createdBy,
  createdAt,
  id,
  comments,
  likes,
  media,
}) {
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

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

  const queryClient = useQueryClient();

  const { mutate: likeFn } = useMutation({
    mutationFn: LikeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const toggleLike = () => {
    likeFn(id);
  };

  const { user } = useOutletContext();

  const repliesCount = comments.reduce((sum, comment) => {
    return sum + comment.replies.length;
  }, 0);

  console.log(user);

  return (
    <div className="overflow-hidden text-slate-500  p-2 ">
      <div className="w-full flex items-center justify-between">
        <header className="flex w-full gap-3 items-start">
          <Link to={`../users/${createdBy._id}`}>
            {createdBy.avatar ? (
              <img
                src={`http://localhost:5000/uploads/${createdBy.avatar}`}
                alt="user name"
                title={`${createdBy.firstName}  ${createdBy.lastName}`}
                className="max-w-full  size-12 rounded-lg cursor-pointer"
              />
            ) : (
              <UserAvatar
                size="size-[2rem]"
                firstname={createdBy.firstName}
                lastname={createdBy.lastName}
              />
            )}
          </Link>
          <div className="w-full flex flex-col">
            <h3 className="text-md md:text-lg font-medium  dark:text-slate-200 text-slate-600">
              {title}
            </h3>
            <p className="text-sm  text-indigo-500/100">
              by {createdBy?.firstName} {createdBy?.lastName} ,
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
                <BlogOperations blogId={id} />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="delete">
                <Pen size={20} cursor="pointer" className="" />
              </Modal.Open>
              <Modal.Window name="delete">
                <BlogForm blogId={id} defaultValues={{ title, description }} />
              </Modal.Window>
            </Modal>
          </div>
        )}
      </div>
      <div
        className="description py-6 dark:text-gray-300 text-sm md:text-[1rem]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {
        // TODO : remember to get back blog image
      }
      {media &&
        (media.endsWith("mp4") ? (
          <video className="aspect-video rounded-lg" muted={false} controls>
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
            className="aspect-vdeo rounded-lg cursor-pointer"
          />
        ))}
      <div className="w-full flex gap-4 p-2 justify-end ">
        <button
          onClick={() => toggleLike(id)}
          className="flex flex-col items-center"
        >
          <Heart
            stroke="#ef4444"
            size={15}
            fill={
              checkIfTheUserHasLikedTheBlog(user?.user?._id, likes)
                ? "red"
                : "transparent"
            }
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
            size={15}
            stroke="#10b981"
            className="cursor-pointer"
          />
          <span className="text-[0.6rem] text-green-500">
            {comments.length + repliesCount} comments
          </span>
        </button>

        <Modal>
          <Modal.Open>
            <div>
              <button className="flex flex-col items-center">
                <Share2
                  size={15}
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
                {/* {copyStatus === "copied" ? (
                    <Check className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
                  ) : (
                    <Copy className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
                  )} */}
              </button>
            </div>
          </Modal.Window>
        </Modal>
        <Link className="flex flex-col items-center" to={`../blogs/${id}`}>
          <SquareArrowOutUpRight
            size={15}
            stroke="#6366f1"
            className=" cursor-pointer"
          />
          <span className="text-[0.6rem] text-indigo-500">overview</span>
        </Link>
      </div>
      {isOpenComments ? <Comments blogId={id} comments={comments} /> : ""}
    </div>
  );
}

const blogIntercations = () => {};

const BlogOperations = ({ closeModal, blogId }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteFn, isPending } = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast("deleted");
      queryClient.invalidateQueries("blogs");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this cabins permanently? This action
        cannot be undone.
      </p>
      <div className="flex items-center  justify-end  ">
        <div className="flex items-center gap-2">
          <Button onClick={() => deleteFn(blogId)} variant="secondary">
            {isPending ? <FullSpinner size="small" /> : "delete"}
          </Button>
          <Button onClick={() => closeModal?.()} variant="ghost">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
