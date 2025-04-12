import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state
        .filter((blog) => blog.id != updatedBlog.id)
        .concat(updatedBlog);
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload;
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, updateBlog, deleteBlog, setBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addLike = (blogObejct) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObejct);
    dispatch(updateBlog(updatedBlog));
  };
};

export const createBlog = (blogObejct) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObejct);
    dispatch(appendBlog(newBlog));
  };
};

export const removeBLog = (blogObejct) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogObejct.id);
    dispatch(deleteBlog(blogObejct));
  };
};

export default blogSlice.reducer;
