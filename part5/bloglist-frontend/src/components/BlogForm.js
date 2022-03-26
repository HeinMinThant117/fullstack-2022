import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

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
    createBlog(title, author, url)
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
      <button id='createBtn' type='submit'>create</button>
    </form>
  )
}

export default BlogForm
