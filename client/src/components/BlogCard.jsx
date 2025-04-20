import {
  Ban,
  Check,
  Copy,
  Heart,
  MessageCircle,
  Pen,
  Share2,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import Comments from "./Comments";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function BlogCard({ isCurrentUser }) {
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
        // alert("Copied to clipboard!");
        setCopyStatus("copied");
      })
      .catch(() => {
        // console.error("Failed to copy: ", err);
        setCopyStatus("not-copied");
      });
  };

  return (
    <div className="overflow-hidden text-slate-500 dark:border-gray-800 border-b border-gray-200 p-2 ">
      <div className="w-full flex items-center justify-between">
        <header className="flex gap-4">
          <a
            href="#"
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <img
              src="https://i.pravatar.cc/48?img=26"
              alt="user name"
              title="user name"
              width="48"
              height="48"
              className="max-w-full rounded-full"
            />
          </a>
          <div>
            <h3 className="text-lg md:text-xl font-medium  dark:text-slate-200 text-slate-600">
              Looking back at time
            </h3>
            <p className="text-sm  text-indigo-500/100">
              By Mary Jay, jun 3 2023
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
      <div className="py-6 dark:text-gray-300 text-sm md:text-[1rem]">
        <p>
          Spend days here, exploring a way of life by bicycle. Discover cobbled
          streets sandwiched between beautiful rickety townhouses and the lazy
          flow of the canal.
        </p>
      </div>
      <img
        src="/picture.jpg"
        alt="card image"
        className="aspect-video w-full rounded-lg"
      />
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
          <span className="text-[0.6rem] text-red-500"> 100 likes</span>
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
          <span className="text-[0.6rem] text-green-500"> 100 comments</span>
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
                <span className="text-[0.6rem] text-indigo-500">
                  100 shares
                </span>
              </button>
            </div>
          </Modal.Open>
          <Modal.Window>
            <div className="flex bg-gray-50 gap-4 dark:bg-gray-100/6 p-4 mt-10 rounded-lg items-center justify-center">
              <p className="text-indigo-500 text-sm ">
                {`${window.location.href}/blogId`}
              </p>
              <button onClick={() => handleCopy(window.location.href)}>
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
      </div>
      {isOpenComments ? <Comments /> : ""}
    </div>
  );
}

const BlogOperations = ({ closeModal }) => {
  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this cabins permanently? This action
        cannot be undone.
      </p>
      <div className="flex items-center  justify-end  ">
        <div className="flex items-center gap-2">
          <Button variant="secondary">delete</Button>
          <Button onClick={() => closeModal?.()} variant="ghost">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
