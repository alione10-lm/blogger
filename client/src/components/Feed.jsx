import { TimeFromNow } from "../services/helpers";
import UserAvatar from "./ui/UserAvatar";
import { Link, useOutletContext } from "react-router-dom";
import { Trash } from "lucide-react";
import ReplyForm from "./ui/ReplyForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, deleteReply } from "../utils/api";
import FullSpinner from "./ui/FullSpinner";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function Feed({ comments, blogCreator, blogId }) {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const {
    mutate: deleteReplyFn,
    isPending: isDeletingReply,
    error,
  } = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const { user } = useOutletContext();

  return comments.map((comment) => (
    <div className="w-full  overflow-x-auto" key={comment._id}>
      <ul
        aria-label="Nested user feed"
        role="feed"
        className="relative flex  w-full flex-col gap-4  pl-6 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600 "
      >
        <li role="article" className="relative pl-4 w-full  ">
          <div className="flex flex-col w-full flex-1 gap-2">
            <Link
              to={`../users/${comment.createdBy._id}`}
              className="absolute z-1 inline-flex items-center justify-center w-6 h-6 text-white rounded-sm -left-3"
            >
              {comment.createdBy.avatar ? (
                <img
                  src={comment.createdBy.avatar}
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
                {comment.createdBy.firstName} {comment.createdBy.lastName}
                <div className=" flex items-center md:gap-4 gap-2">
                  <span className="md:text-sm ml-2  font-normal text-xs text-slate-400">
                    commented
                  </span>
                  <button
                    disabled={isDeleting}
                    className="cursor-pointer disabled:cursor-not-allowed text-indigo-500"
                  >
                    {comment.createdBy._id === user?.user?._id && (
                      <Modal>
                        <Modal.Open opens="comment">
                          <Trash size={15} />
                        </Modal.Open>
                        <Modal.Window name="comment">
                          <ConfirmDeleteComment id={comment._id} />
                        </Modal.Window>
                      </Modal>
                    )}
                  </button>
                </div>
              </div>
              <span className="text-xs font-normal text-slate-400">
                {TimeFromNow(comment.createdAt)}
              </span>
            </h4>
            <span className="text-sm text-slate-500  break-words max-w-[15rem] md:max-w-2/3 dark:text-gray-300">
              {comment.text}
            </span>
          </div>
          <ReplyForm>
            <ReplyForm.OpenForm />
            <ReplyForm.Form
              id={comment._id}
              blogCreator={blogCreator}
              commentCreator={comment.createdBy._id}
              blogId={blogId}
            />
          </ReplyForm>

          {comment.replies.length > 0 && (
            <ul
              role="group"
              className="relative flex flex-col gap-5 w-full py-5 pl-6 before:absolute before:top-6 before:left-6 before:bottom-6 before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-12 after:left-6 after:bottom-12 after:-translate-x-1/2 after:border after:border-slate-200 dark:after:border-slate-600 dark:before:border-slate-600"
            >
              {comment.replies.map((reply, ndx) => (
                <li key={ndx} role="article" className="relative pl-6 ">
                  <div className="flex flex-col flex-1 ">
                    <Link
                      to={`../users/${comment.createdBy._id}`}
                      className="absolute z-1 inline-flex items-center justify-center w-6 h-6 text-white rounded-lg -left-3 "
                    >
                      {reply.createdBy.avatar ? (
                        <img
                          src={reply.createdBy.avatar}
                          alt="user name"
                          title={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                          className=" size-[1.5rem]  rounded-sm  "
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
                      <div className="flex-1 flex items-center">
                        {reply.createdBy.firstName} {reply.createdBy.lastName}
                        <div className=" flex items-center md:gap-4 gap-2">
                          <span className="md:text-sm ml-2  font-normal text-xs text-slate-400">
                            replied
                          </span>
                          <button
                            disabled={isDeletingReply}
                            className="cursor-pointer disabled:cursor-not-allowed text-indigo-500"
                          >
                            {reply.createdBy._id === user?.user?._id && (
                              <Modal>
                                <Modal.Open opens="reply">
                                  <Trash size={15} />
                                </Modal.Open>
                                <Modal.Window name="reply">
                                  <ConfirmDeleteReply id={reply._id} />
                                </Modal.Window>
                              </Modal>
                            )}
                          </button>
                        </div>
                      </div>
                      <span className="text-xs font-normal text-slate-400">
                        {TimeFromNow(comment.createdAt)}
                      </span>
                    </h4>

                    <span className="text-sm text-slate-500 md:max-w-1/2 max-w-[10rem] break-words  dark:text-gray-300">
                      {reply.text}
                    </span>
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
const ConfirmDeleteComment = ({ closeModal, id }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentFn, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this comment permanently? This action
        cannot be undone.
      </p>
      <div className="flex items-center  justify-end  ">
        <div className="flex items-center gap-2">
          <Button onClick={deleteCommentFn} variant="secondary">
            {isDeleting ? <FullSpinner size="small" /> : "delete"}
          </Button>
          <Button onClick={() => closeModal?.()} variant="ghost">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
const ConfirmDeleteReply = ({ closeModal, id }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteReplyFn, isPending: isDeletingReply } = useMutation({
    mutationFn: () => deleteReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this reply permanently? This action
        cannot be undone.
      </p>
      <div className="flex items-center  justify-end  ">
        <div className="flex items-center gap-2">
          <Button onClick={deleteReplyFn} variant="secondary">
            {isDeletingReply ? <FullSpinner size="small" /> : "delete"}
          </Button>
          <Button onClick={() => closeModal?.()} variant="ghost">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
