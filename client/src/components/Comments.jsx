import React, { useState } from "react";
import FormRow from "./ui/FormRow";
import { Send } from "lucide-react";
import Button from "./ui/Button";
import Feed from "./Feed";
import EmptyComments from "./ui/EmptyComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../utils/api";
import { useForm } from "react-hook-form";
import Error from "./ui/Error";
import FullSpinner from "./ui/FullSpinner";
import toast from "react-hot-toast";
import clsx from "clsx";

const Comments = ({ comments, blogId }) => {
  const [commentSession, setCommentSession] = useState(true);

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
      queryClient.invalidateQueries("blogs");
      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "something went wrong , try again later ");
    },
  });

  const onSubmit = (data) => {
    const commentData = {
      text: data.text,
      blogId,
    };

    mutate(commentData);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="max-h-[20rem] overflow-auto styled-scrollbar">
        {!comments.length ? (
          <EmptyComments />
        ) : (
          <Feed
            commentSession={commentSession}
            setCommentSession={setCommentSession}
            comments={comments}
          />
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
            placeholder={clsx(
              commentSession ? "add new comment" : "add a reply"
            )}
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
