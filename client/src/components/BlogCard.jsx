import { Copy, Heart, MessageCircle, Pen, Share2, Trash } from "lucide-react";
import React, { useState } from "react";
import Comments from "./Comments";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function BlogCard({ isCurrentUser }) {
  const [like, setLike] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);

  const toggleLike = () => {
    setLike((like) => !like);
  };

  const toggleComments = () => {
    setIsOpenComments((open) => !open);
  };

  return (
    <>
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
              <Pen size={20} cursor="pointer" className="" />
              <Trash size={20} cursor="pointer" className="" />
            </div>
          )}
        </div>
        <div className="py-6 dark:text-gray-300 text-sm md:text-[1rem]">
          <p>
            Spend days here, exploring a way of life by bicycle. Discover
            cobbled streets sandwiched between beautiful rickety townhouses and
            the lazy flow of the canal.
          </p>
        </div>
        <figure>
          <img
            src="/picture.jpg"
            alt="card image"
            className="aspect-video w-full rounded-lg"
          />
        </figure>
        <div className="w-full flex gap-4 p-2 justify-end ">
          <button className="flex flex-col items-center">
            <Heart
              stroke="#ef4444"
              size={20}
              fill={like ? "red" : "transparent"}
              className="cursor-pointer"
              onClick={() => toggleLike()}
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
              <button className="flex flex-col items-center">
                <Share2
                  size={20}
                  stroke="#6366f1"
                  className=" cursor-pointer"
                />
                <span className="text-[0.6rem] text-indigo-500">
                  {" "}
                  100 shares
                </span>
              </button>
            </Modal.Open>
            <Modal.Window>
              <div className="flex bg-gray-50 gap-4 dark:bg-gray-100/6 p-4 mt-10 rounded-lg items-center justify-center">
                <p className="text-indigo-500 text-sm ">
                  {`${window.location.href}/blogId`}
                </p>

                <Copy className="bg-indigo-100 text-indigo-500 p-2 size-8 rounded-lg cursor-pointer" />
              </div>
            </Modal.Window>
          </Modal>
        </div>
        {isOpenComments ? <Comments /> : ""}
      </div>
    </>
  );
}
