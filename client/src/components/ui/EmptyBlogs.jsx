import { CirclePlus, FileText } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import BlogForm from "../BlogForm";

const EmptyBlogs = ({ isCurrentUser }) => {
  return (
    <div className="text-center flex items-center flex-col py-10">
      <FileText className="mx-auto h-12 w-12 text-indigo-300" />
      <h3 className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        No blogs yet
      </h3>
      {isCurrentUser && (
        <div className="flex gap-4 items-center">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            You haven’t written any blogs yet. Start creating one!
          </p>
          <Modal>
            <Modal.Open opens="new-blog">
              <Button size="small">
                <CirclePlus size={15} className="stroke-indigo-50" />
              </Button>
            </Modal.Open>
            <Modal.Window name="new-blog">
              <BlogForm />
            </Modal.Window>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default EmptyBlogs;
