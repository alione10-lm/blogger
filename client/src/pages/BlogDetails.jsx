import React from "react";

import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { blogId } = useParams();

  return (
    <div>
      <h1>Blog Details</h1>
      <p>{blogId}</p>
    </div>
  );
};

export default BlogDetails;
