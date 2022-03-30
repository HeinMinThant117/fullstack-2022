import React from 'react'
const Blog = ({ blog }) => {
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
      <a href={'/blogs/' + blog.id}>
        {blog.title} {blog.author}
      </a>
    </div>
  )
}

export default Blog
