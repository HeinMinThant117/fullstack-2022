import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})

export default store
