import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    error: false,
  },
  reducers: {
    addNotification(state, action) {
      return action.payload
      //   state = action.paylo
    },
    removeNotification() {
      return {
        message: '',
        error: false,
      }
    },
  },
})

export const setNotification = (message, error) => {
  return async (dispatch) => {
    dispatch(addNotification({ message, error }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
