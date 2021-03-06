import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`${title} by ${author} has been created`))
    // createBlog(title, author, url)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          id='title'
          placeholder='type title here'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          id='author'
          placeholder='type author here'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          id='url'
          placeholder='type url here'
          onChange={handleUrlChange}
        />
      </div>
      <button id='createBtn' type='submit'>
        create
      </button>
    </form>
  )
}

export default BlogForm
