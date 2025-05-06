import React, { useState } from "react";
import { TimeFromNow } from "../services/helpers";
import UserAvatar from "./ui/UserAvatar";
import { Link, useOutletContext } from "react-router-dom";
import { Trash } from "lucide-react";
import ReplyForm from "./ReplyForm";

export default function Feed({ comments }) {
  const [isReplyFormOpens, setIsReplyFormOpens] = useState(false);

  const { user } = useOutletContext();

  return comments.map((comment) => (
    <div className="w-full  overflow-x-auto" key={comment._id}>
      <ul
        aria-label="Nested user feed"
        role="feed"
        className="relative flex  flex-col gap-4  pl-6 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600 "
      >
        <li role="article" className="relative pl-4 ">
          <div className="flex flex-col flex-1 gap-2">
            <Link
              to={`../users/${comment.createdBy._id}`}
              className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-sm -left-3"
            >
              {comment.createdBy.avatar ? (
                <img
                  src={`http://localhost:5000/uploads/${comment.createdBy.avatar}`}
                  alt="user name"
                  title={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                  className=" rounded-sm size-[1.5rem]"
                />
              ) : (
                <UserAvatar
                  size={"size-[1.5rem]"}
                  firstname={comment.createdBy.firstName}
                  lastname={comment.createdBy.lastName}
                />
              )}
            </Link>
            <h4 className="flex flex-col items-start text-sm md:text-base font-medium leading-6 text-slate-600 dark:text-gray-200 md:flex-row lg:items-center">
              <div className="flex-1 flex items-center">
                {comment.createdBy.firstName} {comment.createdBy.firstName}
                <div className=" flex items-center md:gap-4 gap-2">
                  <span className="md:text-sm ml-2  font-normal text-xs text-slate-400">
                    commented
                  </span>
                  <span className="cursor-pointer text-indigo-500">
                    {comment.createdBy._id === user?.user?._id && (
                      <Trash size={15} />
                    )}
                  </span>
                </div>
              </div>
              <span className="text-xs font-normal text-slate-400">
                {TimeFromNow(comment.createdAt)}
              </span>
            </h4>
            <p className="text-sm text-slate-500 dark:text-gray-300">
              {comment.text}
            </p>
          </div>
          <button
            onClick={() => setIsReplyFormOpens((prev) => !prev)}
            className="text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            {isReplyFormOpens ? "cancel" : "reply"}
          </button>
          {isReplyFormOpens && <ReplyForm />}
          {comment.replies.length > 0 && (
            <ul
              role="group"
              className="relative flex flex-col gap-5 py-5 pl-6 before:absolute before:top-6 before:left-6 before:bottom-6 before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-12 after:left-6 after:bottom-12 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600"
            >
              {comment.replies.map((reply, ndx) => (
                <li key={ndx} role="article" className="relative pl-6 ">
                  <div className="flex flex-col flex-1 ">
                    <Link
                      to={`../users/${comment.createdBy._id}`}
                      className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-lg -left-3 "
                    >
                      {reply.createdBy.avatar ? (
                        <img
                          src={reply.createdBy.avatar}
                          alt="user name"
                          title={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                          className=" size-[1.5rem] rounded-sm  "
                        />
                      ) : (
                        <UserAvatar
                          size={"size-[1.5rem]"}
                          firstname={reply.createdBy.firstName}
                          lastname={reply.createdBy.lastName}
                        />
                      )}
                    </Link>
                    <h4 className="flex flex-col items-start text-sm font-medium leading-6 text-slate-600 dark:text-gray-200 md:flex-row lg:items-center">
                      <span className="flex-1">
                        {reply.createdBy.firstName} {reply.createdBy.firstName}
                        <span className="ml-2 text-xs md:text-sm font-normal text-slate-400">
                          replied
                        </span>
                      </span>
                      <span className="text-xs font-normal text-slate-400">
                        {TimeFromNow(reply.createdAt)}
                      </span>
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-gray-300">
                      {reply.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  ));
}
