import { configureStore } from "@reduxjs/toolkit";

import blogReducer, {initializeBlogs} from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer
  }
})

store.dispatch(initializeBlogs())

export default store