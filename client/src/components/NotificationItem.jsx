import React from "react";
import { TimeFromNow } from "../services/helpers";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Trash } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

const NotificationItem = ({ id, type, content, link, isRead, createdAt }) => {
  return (
    <div
      key={id}
      className={`flex items-start gap-3 bg-gray-50/10 dark:bg-dark-bg-1/60 md:w-2/3 w-full p-4 rounded-lg border border-gray-100 dark:border-gray-800 `}
    >
      <div className="mt-1">
        {type === "comment" ? (
          <MessageCircle className="text-emerald-500-400" />
        ) : (
          <Heart className="text-red-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm w-full flex items-center justify-between dark:text-gray-200 text-gray-600">
          <span>{content}</span>
          <Modal>
            <Modal.Open opens="delete">
              <Trash className="text-red-400 size-8 hover:text-red-800 hover:bg-red-400 cursor-pointer rounded-md transition-all duration-200 p-2" />
            </Modal.Open>
            <Modal.Window name="delete">
              <DeleteConfirmation />
            </Modal.Window>
          </Modal>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {TimeFromNow(createdAt)}
        </p>
        <Link className="text-sm text-indigo-500 " to={link}>
          see blog &rarr;
        </Link>
      </div>
    </div>
  );
};

export default NotificationItem;

const DeleteConfirmation = ({ closeModal, blogId }) => {
  //   const queryClient = useQueryClient();

  //   const { mutate: deleteFn, isPending } = useMutation({
  //     mutationFn: (id) => deleteBlog(id),
  //     onSuccess: () => {
  //       toast("deleted");
  //       queryClient.invalidateQueries("blogs");
  //       closeModal();
  //     },
  //     onError: (err) => {
  //       toast.error(err.message);
  //     },
  //   });

  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this notification permanently? This
        action cannot be undone.
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
