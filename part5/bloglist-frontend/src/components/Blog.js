import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
const Blog = ({ blog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
    }
    // updateBlog(blog.id, newBlog)
    dispatch(likeBlog(blog.id, newBlog))
  }

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author} ?`
      )
    )
      dispatch(deleteBlog(blog.id))
  }

  return (
    <div
      style={{
        marginTop: '5px',
        marginBottom: '5px',
        border: '1px solid black',
        padding: '5px',
      }}
      className='blog'
    >
      <div>
        {blog.title} {blog.author}
        <button className='showButton' onClick={toggleBlogVisibility}>
          {blogVisible ? 'hide' : 'view'}
        </button>
      </div>
      {blogVisible && (
        <div className='blogDetailed'>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>
            likes {blog.likes}{' '}
            <button className='likeBtn' onClick={handleLike}>
              like
            </button>
          </div>
          <div className='blogUsername'>
            {blog.user.username}
            {blog.user.id === user.id && (
              <button onClick={handleDelete}>delete</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
