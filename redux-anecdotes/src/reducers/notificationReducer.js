import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const notificationSlice = createSlice ({

  name: 'notification',
  initialState,
  reducers: {
    notificationAnecdotes(state, action) {
      return action.payload
    },
    removeNotificationAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { notificationAnecdotes, removeNotificationAnecdotes } = notificationSlice.actions
export default notificationSlice.reducer