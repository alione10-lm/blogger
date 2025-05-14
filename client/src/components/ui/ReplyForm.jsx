import { createContext, useContext, useState } from "react";
import Button from "./Button";
import { Send } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  createComment,
  createNotification,
  createReply,
} from "../../utils/api";

import FullSpinner from "./FullSpinner";

import Error from "./Error";
import { useOutletContext } from "react-router-dom";
const ReplyContext = createContext();

const ReplyForm = ({ children }) => {
  const [openName, setopenName] = useState(false);

  const open = setopenName;

  return (
    <ReplyContext.Provider
      value={{
        close,
        openName,
        open,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
};

const OpenForm = () => {
  const { open, openName } = useContext(ReplyContext);

  return (
    <button
      className="cursor-pointer dark:text-gray-200 text-gray-700"
      onClick={() => open((prev) => !prev)}
    >
      {openName ? "cancel" : "reply"}
    </button>
  );
};
const Form = ({ id, commentCreator = {}, blogCreator, blogId }) => {
  const { open } = useContext(ReplyContext);

  const queryClient = useQueryClient();
  const { openName } = useContext(ReplyContext);

  const { user } = useOutletContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    mutate: reply,
    isPending,
    error,
  } = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      open(false);
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: createNotificationFn } = useMutation({
    mutationFn: createNotification,
  });

  // console.log(blogCreator, commentCreator);
  const formSubmit = (data) => {
    reply({ ...data, replyTo: id });

    // ila kan mol reply how mol comment ===> madir walo ;
    // ila kan mol reply how mol blog === madir walo ;

    //  if(user?.user?._id === commentCreator) return ;

    if (user?.user?._id === blogCreator || user?.user?._id === commentCreator)
      return;

    createNotificationFn({
      user: blogCreator,
      content: `${user?.user?.firstName} ${user?.user?.lastName} commented on your blog , "${data.text}"`,
      type: "comment",
      link: `${window.location.origin}/app/blogs/${blogId}`,
    });
    createNotificationFn({
      user: commentCreator,
      content: `${user?.user?.firstName} ${user?.user?.lastName} replied to your comment , "${data.text}"`,
      type: "reply",
      link: `${window.location.origin}/app/blogs/${blogId}`,
    });
  };

  if (!openName) return null;

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="w-2/3 flex flex-col md:w-1/2 m-1 "
    >
      <div className="flex items-center gap-1">
        <input
          {...register("text", {
            required: "reply must be at lest one charactere",
          })}
          type="text"
          disabled={isPending}
          className="input p-1 disabled:cursor-not-allowed"
        />
        <Button disabled={isPending} type="submit" size="small">
          {isPending ? (
            <FullSpinner size="small" />
          ) : (
            <Send size={12} className="stroke-indigo-50" />
          )}
        </Button>
      </div>
      {errors?.text?.message && <Error>{errors?.text?.message}</Error>}
    </form>
  );
};

ReplyForm.OpenForm = OpenForm;
ReplyForm.Form = Form;

export default ReplyForm;
