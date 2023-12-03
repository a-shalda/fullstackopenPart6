import { createSlice } from '@reduxjs/toolkit'

const initialState = 'You added an anecdote'

const notificationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    notificationAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { notificationAnecdotes } = notificationSlice.actions
export default notificationSlice.reducer