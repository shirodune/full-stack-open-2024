import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      blogService.setToken(user.token);
      return user
    }
  }
})

export const { setUser } = userSlice.actions

export const Login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password,
    })
    dispatch(setUser(user))
  }
}

export default userSlice.reducer