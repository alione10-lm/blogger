import axios from "axios";

export const getAllBlogs = async () => {
  try {
    const res = await axios.get("/api/blogs");

    console.log(res.data);
    return res;
    // return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message || "failed to fetch");
  }
};
export const getSingleBlog = async (blogId) => {
  try {
    const res = await axios.get(`api/blogs/${blogId}`);
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const createBlog = async (blogData) => {
  try {
    const res = await axios.post("api/blogs", blogData);
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const res = await axios.delete(`api/blogs/${blogId}`);
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const updateBlog = async (blogId) => {
  try {
    const res = await axios.patch(`api/blogs/${blogId}`);
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const LikeBlog = async (blogId) => {
  try {
    const res = await axios.post(`api/blogs/like/${blogId}`);
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("api/current-user");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const updateUser = async () => {
  try {
    const res = await axios.patch("api/current-user");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const deleteUser = async () => {
  try {
    const res = await axios.delete("api/current-user");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const createComment = async () => {
  try {
    const res = await axios.post("api/blog/comment");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteComment = async () => {
  try {
    const res = await axios.delete("api/blog/comment");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const updateComment = async () => {
  try {
    const res = await axios.patch("api/blog/comment");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const createReply = async () => {
  try {
    const res = await axios.post("api/blog/comment/reply");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteReply = async () => {
  try {
    const res = await axios.delete();
    return await res.json;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const login = async () => {
  try {
    const res = await axios.post("api/auth/login");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const register = async () => {
  try {
    const res = await axios.post("api/auth/register");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("api/auth/logout");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
