import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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
      console.log('Invalid credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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

  return (
    <div>
      <h2>blogs</h2>
      {user ? (
        <div>
          {user.username} has logged in{' '}
          <button onClick={handleLogout}>log out</button>
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
