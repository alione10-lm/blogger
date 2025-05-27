import { TimeFromNow } from "../services/helpers";
import { Link } from "react-router-dom";
import { Eye, Heart, MessageCircle, Trash } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "../utils/api";
import Menu from "./ui/Menu";
import FullSpinner from "./ui/FullSpinner";

const NotificationItem = ({ id, type, content, link, isRead, createdAt }) => {
  return (
    <div
      key={id}
      className={`flex items-start flex-col gap-3 bg-gray-50/10 dark:bg-dark-bg-1/60 md:w-2/3 w-full p-4 rounded-lg border border-gray-100 dark:border-gray-800 `}
    >
      <div className="w-full flex items-center justify-between">
        <div className="mt-1">
          {type === "comment" || type === "reply" ? (
            <MessageCircle className="text-emerald-500" />
          ) : (
            <Heart className="text-red-500" />
          )}
        </div>
        <Menu>
          <Menu.Button />
          <Menu.List>
            <Modal>
              <Menu.Item>
                <Modal.Open opens="delete">
                  <button className="w-full flex items-center  cursor-pointer gap-2 text-start">
                    <Trash size={14} />
                    delete
                  </button>
                </Modal.Open>
              </Menu.Item>

              {/* <Menu.Item>
                <Modal.Open opens="read">
                  <button className="w-full flex items-center  cursor-pointer gap-2 text-start">
                    <Eye size={14} />
                    mark as read
                  </button>
                </Modal.Open>
              </Menu.Item> */}

              <Modal.Window name="delete">
                <DeleteConfirmation id={id} />
              </Modal.Window>

              <Modal.Window name="read">
                <DeleteConfirmation id={id} />
              </Modal.Window>
            </Modal>
          </Menu.List>
        </Menu>
      </div>

      <div className="flex-1">
        <div className="text-sm w-full flex items-center justify-between dark:text-gray-200 text-gray-600">
          <p className="break-words w-full ">{content}</p>
          <span></span>
        </div>
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

const DeleteConfirmation = ({ closeModal, id }) => {
  const queryClient = useQueryClient();
  console.log(id);

  const { mutate: deleteFn, isPending } = useMutation({
    mutationFn: () => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      closeModal();
    },
  });

  return (
    <div className="">
      <p className="mt-10 text-gray-700 dark:text-gray-300 mb-5">
        Are you sure you want to delete this notification permanently? This
        action cannot be undone.
      </p>
      <div className="flex items-center  justify-end  ">
        <div className="flex items-center gap-2">
          <Button onClick={deleteFn} variant="secondary">
            {isPending ? <FullSpinner size="small" /> : "delete"}
          </Button>
          <Button onClick={() => closeModal?.()} variant="ghost">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
