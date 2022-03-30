import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const UserInfo = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  if (users.length <= 0) return null

  return (
    <table>
      <tbody>
        <h2>Users</h2>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <a href={'/users/' + user.id}>{user.name}</a>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserInfo
