import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

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
    updateBlog(blog.id, newBlog)
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
            likes {blog.likes} <button className='likeBtn' onClick={handleLike}>like</button>
          </div>
          <div className='blogUsername'>{blog.user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
