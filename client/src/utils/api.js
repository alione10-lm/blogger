import axios from "axios";

export const getAllBlogs = async (params) => {
  const filter = params.queryKey.at(-1);
  const { pageParam } = params;

  console.log(params.queryKey.at(-1));

  try {
    const res = await axios.get(
      `/api/blogs?page=${pageParam}&filter=${filter}`
    );

    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "failed to fetch");
  }
};
// export const getAllBlogs2 = async ({ pageParam = 1 }) => {
//   try {
//     const res = await axios.get(`http://localhost:5000/scroll?${pageParam}`);

//     return res.data.blogs;
//   } catch (err) {
//     throw new Error(err?.response?.data?.message || "failed to fetch");
//   }
// };
export const getSingleBlog = async (blogId) => {
  try {
    const res = await axios.get(`/api/blogs/${blogId}`);
    return res.data.blog;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "no blog found with this id"
    );
  }
};
export const createBlog = async (blogData) => {
  try {
    const res = await axios.post("/api/blogs", blogData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const res = await axios.delete(`/api/blogs/${blogId}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const updateBlog = async ({ blogId, formData }) => {
  try {
    const res = await axios.patch(`/api/blogs/${blogId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const LikeBlog = async (blogId) => {
  try {
    const res = await axios.post(`/api/blogs/${blogId}/like`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/api/users/current-user");
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const updateUser = async (userInfo) => {
  console.log(userInfo);
  try {
    const res = await axios.patch("/api/users/current-user", userInfo, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const deleteUser = async () => {
  try {
    const res = await axios.delete("/api/current-user");
    return await res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const getSingleUser = async (userId) => {
  try {
    const res = await axios.get(`/api/users/${userId}`);
    return res.data.user;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
export const createComment = async (commentInfo) => {
  try {
    const res = await axios.post("/api/blog/comment", commentInfo);
    return await res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await axios.delete(`/api/blog/comment/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const updateComment = async () => {
  try {
    const res = await axios.patch("/api/blog/comment");
    return await res.json();
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const createReply = async (replyData) => {
  try {
    const res = await axios.post("/api/blog/comment/reply", replyData);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const deleteReply = async (id) => {
  try {
    const res = await axios.delete(`/api/blog/comment/reply/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const login = async (loginInfo) => {
  try {
    const res = await axios.post("/api/auth/login", loginInfo);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const register = async (registerInfo) => {
  try {
    const res = await axios.post("/api/auth/register", registerInfo);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("/api/auth/logout");
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const search = async (query) => {
  try {
    const res = await axios.get(`/api/search?search=${query}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export const createNotification = async (notificationInfo) => {
  try {
    const res = await axios.post("/api/notifications", notificationInfo);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await axios.delete(`/api/notifications/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
export const getUserNotification = async () => {
  try {
    const res = await axios.get("/api/notifications");
    return res.data.notifications;
  } catch (err) {
    throw new Error(err);
  }
};

export const readAllNotifications = async () => {
  try {
    const res = await axios.get("/api/notfications/read-all");
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
