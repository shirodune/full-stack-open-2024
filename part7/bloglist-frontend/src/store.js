import { configureStore } from "@reduxjs/toolkit";

import blogReducer, { initializeBlogs } from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

store.dispatch(initializeBlogs());

export default store;
