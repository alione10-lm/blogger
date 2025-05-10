import React from "react";

const SearchBlogSkeleton = () => {
  return (
    <div className="p-4">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-3"></div>
      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
  );
};

export default SearchBlogSkeleton;
