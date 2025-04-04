import { Heart, MessageCircle, Pen, Share2, Trash } from "lucide-react";
import React, { useState } from "react";
import Comments from "./Comments";

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
      <div className="overflow-hidden text-slate-500 border-b border-gray-200 p-4 ">
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
              <h3 className="text-xl font-medium text-slate-700">
                Looking back at time
              </h3>
              <p className="text-sm text-slate-400"> By Mary Jay, jun 3 2023</p>
            </div>
          </header>
          {isCurrentUser && (
            <div className="flex items-center  gap-4">
              <Pen size={20} cursor="pointer" className="" />
              <Trash size={20} cursor="pointer" className="" />
            </div>
          )}
        </div>
        <div className="p-6">
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
            className="aspect-video w-full"
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
          <button className="flex flex-col items-center">
            <Share2 size={20} stroke="#6366f1" className=" cursor-pointer" />
            <span className="text-[0.6rem] text-indigo-500"> 100 shares</span>
          </button>
        </div>
        {isOpenComments ? <Comments /> : ""}
      </div>
    </>
  );
}
