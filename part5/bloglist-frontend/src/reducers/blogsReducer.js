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
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
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
    let savedBlog = await blogService.create(data)
    console.log(savedBlog)
    dispatch(addBlog(savedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (id, newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, newBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions
export default blogsSlice.reducer
