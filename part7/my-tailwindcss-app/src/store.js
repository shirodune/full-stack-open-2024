import { configureStore } from "@reduxjs/toolkit";

import blogReducer, { initializeBlogs } from "./reducers/blogReducer";
import usersReducer, { initializeUsers } from "./reducers/usersReducer"
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

store.dispatch(initializeBlogs());
store.dispatch(initializeUsers());

export default store;
