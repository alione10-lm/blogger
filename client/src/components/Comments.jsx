import React, { useState } from "react";
import FormRow from "./ui/FormRow";
import { Reply, Send } from "lucide-react";
import Button from "./ui/Button";
import Feed from "./Feed";
import EmptyComments from "./ui/EmptyComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, createNotification } from "../utils/api";
import { useForm } from "react-hook-form";
import Error from "./ui/Error";
import FullSpinner from "./ui/FullSpinner";
import toast from "react-hot-toast";
import clsx from "clsx";
import ReplyForm from "./ReplyForm";
import { useOutletContext } from "react-router-dom";

const Comments = ({
  comments,
  blogId,
  commentId,
  isOverview = false,
  blogCreator,
}) => {
  const { user } = useOutletContext();

  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate, isPending: isCreatingComment } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["blogs"] });
      // queryClient.invalidateQueries({ queryKey: ["get-single-blog"] });
      // queryClient.invalidateQueries({ queryKey: ["single-user"] });
      queryClient.invalidateQueries();
      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "something went wrong , try again later ");
    },
  });

  const { mutate: createNotificationFn } = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("error");
    },
  });

  const onSubmit = (data) => {
    const commentData = {
      text: data.text,
      blogId,
    };

    mutate(commentData);

    if (user?.user?._id === blogCreator) return;
    createNotificationFn({
      user: blogCreator,
      content: `${user?.user?.firstName} ${user?.user?.lastName} commented on your blog ,"${data.text}"`,
      type: "comment",
      link: `${window.location.origin}/app/blogs/${blogId}`,
    });
  };

  return (
    <div className="w-full flex flex-col">
      {/* <div className="max-h-[20rem] overflow-auto styled-scrollbar"> */}
      <div
        className={clsx(
          " overflow-auto styled-scrollbar",
          isOverview ? "max-h-[50rem]" : "max-h-[20rem]"
        )}
      >
        {!comments.length ? (
          <EmptyComments />
        ) : (
          <Feed blogCreator={blogCreator} comments={comments} blogId={blogId} />
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex pl-4 py-2   gap-1  "
      >
        <div className="w-full">
          <input
            type="text"
            className="input p-1"
            placeholder={"add new comment"}
            {...register("text", {
              required: "comment must be at lest 1 character",
            })}
          />
          {errors?.comment?.message && (
            <Error>{errors?.comment?.message}</Error>
          )}
        </div>
        <div>
          <Button size="small" type="submit">
            {isCreatingComment ? (
              <FullSpinner size="small" />
            ) : (
              <Send className="bg-indigo-2 " size={15} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
