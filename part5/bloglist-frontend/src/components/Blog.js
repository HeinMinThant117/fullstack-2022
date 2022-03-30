import React from 'react'
// import { useDispatch } from 'react-redux'
// import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
const Blog = ({ blog }) => {
  //   const dispatch = useDispatch()

  //   const handleLike = () => {
  //     const newBlog = {
  //       title: blog.title,
  //       url: blog.url,
  //       author: blog.author,
  //       likes: blog.likes + 1,
  //     }
  //     dispatch(likeBlog(blog.id, newBlog))
  //   }

  //   const handleDelete = () => {
  //     if (
  //       window.confirm(
  //         `Are you sure you want to delete ${blog.title} by ${blog.author} ?`
  //       )
  //     )
  //       dispatch(deleteBlog(blog.id))
  //   }

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
