import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
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
    id='notiMessage'
  >
    {message}
  </h3>
)

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notiMessage, setNotiMessage] = useState('')
  const [errorNoti, setErrorNoti] = useState(false)
  const blogFormRef = useRef()

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
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (exception) {
      setNotiMessage('wrong username or password')
      setErrorNoti(true)
      //   setTimeout(() => {
      //     setNotiMessage(null)
      //     setErrorNoti(false)
      //   }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (title, author, url) => {
    try {
      const savedBlog = await blogService.create({ title, author, url })
      console.log(savedBlog)
      setNotiMessage(
        `a new blog ${savedBlog.title} by ${savedBlog.author} has been added`
      )
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
      setBlogs(blogs.concat(savedBlog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (id, newBlog) => {
    try {
      const updatedBlog = await blogService.update(id, newBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
      console.log(exception.body)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleUsernameChange = (username) => {
    setUsername(username)
  }

  const handlePasswordChange = (password) => {
    setPassword(password)
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
          <Toggleable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      ) : (
        <LoginForm
          handleSubmit={handleSubmit}
          handleUsernameChange={({ target }) =>
            handleUsernameChange(target.value)
          }
          handlePasswordChange={({ target }) =>
            handlePasswordChange(target.value)
          }
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
