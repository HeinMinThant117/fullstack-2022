import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserInfo from './components/UserInfo'
import User from './components/User'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.message) return null

  return (
    <h3
      style={{
        border: '5px solid ' + notification.error ? 'red' : 'green',
        padding: '10px',
        backgroundColor: 'grey',
        color: notification.error ? 'red' : 'green',
      }}
      id='notiMessage'
    >
      {notification.message}
    </h3>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
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
      <Notification />
      {user ? (
        <div>
          {user.username} has logged in{' '}
          <button onClick={handleLogout}>log out</button>
          <Router>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <h2>create new</h2>
                    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                      <BlogForm />
                    </Toggleable>
                    {blogs.map((blog) => (
                      <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                  </>
                }
              />
              <Route path='/users' element={<UserInfo />} />
              <Route path='/users/:id' element={<User />} />
            </Routes>
          </Router>
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
