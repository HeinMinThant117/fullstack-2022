import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div
      style={{
        marginTop: '5px',
        marginBottom: '5px',
        border: '1px solid black',
        padding: '5px',
      }}
    >
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleBlogVisibility}>
          {blogVisible ? 'hide' : 'view'}
        </button>
      </div>
      {blogVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
