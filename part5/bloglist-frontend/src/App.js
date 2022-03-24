import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, error }) => (
  <h3
    style={{
      border: '5px solid ' + error ? 'red' : 'green',
      padding: '10px',
      backgroundColor: 'grey',
      color: error ? 'red' : 'green',
    }}
  >
    {message}
  </h3>
)

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const [notiMessage, setNotiMessage] = useState('')
  const [errorNoti, setErrorNoti] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (exception) {
      setNotiMessage('wrong username or password')
      setErrorNoti(true)
      setTimeout(() => {
        setNotiMessage(null)
        setErrorNoti(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create({ title, author, url })
      setNotiMessage(
        `a new blog ${savedBlog.title} by ${savedBlog.author} has been added`
      )
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
      setBlogs(blogs.concat(savedBlog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogSubmit}>
        <div>
          title
          <input onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notiMessage && <Notification message={notiMessage} error={errorNoti} />}
      {user ? (
        <div>
          {user.username} has logged in{' '}
          <button onClick={handleLogout}>log out</button>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
