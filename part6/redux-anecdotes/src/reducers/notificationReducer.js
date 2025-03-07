import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})

export const { notificationChange } = NotificationSlice.actions
export default NotificationSlice.reducer