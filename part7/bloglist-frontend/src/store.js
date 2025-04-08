import { configureStore } from "@reduxjs/toolkit";

import blogReducer, {initializeBlogs} from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer
  }
})

store.dispatch(initializeBlogs())

export default store