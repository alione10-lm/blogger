import { MessageCircle } from "lucide-react";
import React from "react";

const EmptyComments = () => {
  return (
    <div className="text-center py-10">
      <MessageCircle className="mx-auto size-8 text-indigo-300" />
      <h3 className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        No comments yet
      </h3>
    </div>
  );
};

export default EmptyComments;
