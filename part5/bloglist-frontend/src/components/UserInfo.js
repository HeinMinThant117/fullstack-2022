import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const UserInfo = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  if (users.length <= 0) return null

  return (
    <div>
      <h2>Users</h2>
      <tr>
        <td></td>
        <td>blogs created</td>
      </tr>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </div>
  )
}

export default UserInfo
