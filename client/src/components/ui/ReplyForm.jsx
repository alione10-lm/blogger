import { createContext, useContext, useState } from "react";
import Button from "./Button";
import { Send } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { createReply } from "../../utils/api";

import FullSpinner from "./FullSpinner";

import Error from "./Error";
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
const Form = ({ id, commentCreator = {} }) => {
  const { open } = useContext(ReplyContext);

  const queryClient = useQueryClient();
  const { openName } = useContext(ReplyContext);

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
      queryClient.invalidateQueries("blogs");
      open(false);
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const formSubmit = (data) => {
    // console.log(data, commentCreator, id);
    reply({ ...data, replyTo: id });
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
          // defaultValue={`@${commentCreator.firstName} ${commentCreator.lastName} `}
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
