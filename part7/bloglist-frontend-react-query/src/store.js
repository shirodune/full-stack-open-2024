import { configureStore } from "@reduxjs/toolkit";

import blogReducer, {initializeBlogs} from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer
  }
})

store.dispatch(initializeBlogs())

export default store