import { createSlice } from "@reduxjs/toolkit"

const NotificationSlice = createSlice({
  name: 'notification',
  initialState : '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})

export const { notificationChange } = NotificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(notificationChange(notification))
    setTimeout((dispatch(notificationChange(''))), time*1000)
  }
}

export default NotificationSlice.reducer