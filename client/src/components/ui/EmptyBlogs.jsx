import { FileText } from "lucide-react";

const EmptyBlogs = ({ isCurrentUser }) => {
  return (
    <div className="text-center py-10">
      <FileText className="mx-auto h-12 w-12 text-indigo-300" />
      <h3 className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        No blogs yet
      </h3>
      {isCurrentUser && (
        <p className="mt-1 text-sm text-gray-400">
          You haven’t written any blogs yet. Start creating one!
        </p>
      )}
    </div>
  );
};

export default EmptyBlogs;
