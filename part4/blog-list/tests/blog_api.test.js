const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map((r) => r.title)
  expect(contents).toContain('Turkey Sandwich')
}, 100000)

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
}, 100000)

test('a note can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)

  expect(contents).not.toContain(blogToDelete.title)
}, 100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'Tester boi',
    url: 'test.com',
    likes: 99,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = response.body.map((r) => r.title)
  expect(contents).toContain('test')
})

test('blog object contain the identifier id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  expect(blogToView.id).toBeDefined()
}, 100000)

test('adding a blog object without likes default likes to 0', async () => {
  const newBlog = {
    title: 'test',
    author: 'Tester boi',
    url: 'test.com',
  }

  const savedBlog = await api.post('/api/blogs').send(newBlog)

  expect(savedBlog.body.likes).toEqual(0)
}, 100000)

test('adding a blog without title or url, return a 400 bad request', async () => {
  const newBlog = {}
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('updating a blog works', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ title: 'Shuko', likes: 500, author: 'Jimmy', url: 'eating.com' })

  expect(updatedBlog.body).toEqual({
    title: 'Shuko',
    author: 'Jimmy',
    url: 'eating.com',
    likes: 500,
    id: blogToUpdate.id,
  })
})

afterAll(() => {
  mongoose.connection.close()
})
