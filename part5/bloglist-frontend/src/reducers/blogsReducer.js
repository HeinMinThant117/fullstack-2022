import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    // dispatch(addBlog({ title: 'Hi', url: 'Hello' }))
    // console.log(data)
    let savedBlog = await blogService.create(data)
    console.log(savedBlog)
    dispatch(addBlog(savedBlog.data))
  }
}

export const { setBlogs, addBlog } = blogsSlice.actions
export default blogsSlice.reducer
