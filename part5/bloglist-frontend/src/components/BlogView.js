import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const BlogView = () => {
  const [blog, setBlog] = useState(null)
  const id = useParams().id

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getOne(id).then((blog) => setBlog(blog))
  }, [])

  const handleLike = () => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
    }
    dispatch(likeBlog(blog.id, newBlog))
    setBlog({ ...blog, ...newBlog })
  }

  if (!blog) return null

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href=''>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogView
