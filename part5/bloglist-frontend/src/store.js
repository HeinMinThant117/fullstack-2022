import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
