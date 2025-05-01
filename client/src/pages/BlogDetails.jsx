import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useParams } from "react-router-dom";
import { getSingleBlog } from "../utils/api";
import FullSpinner from "../components/ui/FullSpinner";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/ui/Skeleton";

const BlogDetails = () => {
  const { blogId } = useParams();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-single-blog"],
    queryFn: () => getSingleBlog(blogId),
  });

  if (isLoading) return <Skeleton />;

  const { createdBy, createdAt, _id: id, title, description } = blog;

  return (
    <div>
      <BlogCard
        createdBy={createdBy}
        createdAt={createdAt}
        title={title}
        description={description}
        id={id}
      />
    </div>
  );
};

export default BlogDetails;
