import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('blog shows only name and author by default', () => {
  const blog = {
    title: 'Testing',
    url: 'testing.com',
    author: 'tester',
    likes: 1,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '623b2c7ce0587d989ab6222d',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Testing tester')
  const detailedBlog = container.querySelector('.blogDetailed')
  expect(detailedBlog).toBeNull()
})

test('blog shows all information when the view button is pressed', async () => {
  const blog = {
    title: 'Testing',
    url: 'testing.com',
    author: 'tester',
    likes: 1,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '623b2c7ce0587d989ab6222d',
    },
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} toggleBlogVisibility={mockHandler} />
  )

  const button = container.querySelector('.showButton')

  userEvent.click(button)

  const blogUrl = container.querySelector('.blogUrl')
  const blogLikes = container.querySelector('.blogLikes')
  const blogUsername = container.querySelector('.blogUsername')

  expect(blogUrl).toHaveTextContent('testing.com')
  expect(blogLikes).toHaveTextContent('likes 1')
  expect(blogUsername).toHaveTextContent('root')
})

test('a like button is pressed twice', async () => {
  const blog = {
    title: 'Testing',
    url: 'testing.com',
    author: 'tester',
    likes: 1,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '623b2c7ce0587d989ab6222d',
    },
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)
  const button = container.querySelector('.showButton')

  userEvent.click(button)
  const likeButton = container.querySelector('.likeBtn')
  userEvent.dblClick(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('blog form create button is pressed with the right data', async () => {
  const createHandler = jest.fn()

  render(<BlogForm createBlog={createHandler} />)

  const titleInput = screen.getByPlaceholderText('type title here')
  const authorInput = screen.getByPlaceholderText('type author here')
  const urlInput = screen.getByPlaceholderText('type url here')
  const createButton = screen.getByText('create')

  userEvent.type(titleInput, 'title test')
  userEvent.type(authorInput, 'author test')
  userEvent.type(urlInput, 'url test')

  userEvent.click(createButton)

  expect(createHandler.mock.calls).toHaveLength(1)

  expect(createHandler.mock.calls[0][0]).toBe('title test')
  expect(createHandler.mock.calls[0][1]).toBe('author test')
  expect(createHandler.mock.calls[0][2]).toBe('url test')
})
