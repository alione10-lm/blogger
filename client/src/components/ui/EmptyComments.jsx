import { MessageCircle } from "lucide-react";
import React from "react";

const EmptyComments = () => {
  return (
    <div className="text-center py-10">
      <MessageCircle className="mx-auto md:size-8 size-5 text-indigo-300" />
      <h3 className="mt-2 md:text-sm text-xs font-semibold text-gray-700 dark:text-gray-200">
        No comments yet
      </h3>
    </div>
  );
};

export default EmptyComments;
