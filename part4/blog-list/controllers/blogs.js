const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'No title or url provided' })
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  let body = request.body

  blog.title = body.title ? body.title : blog.title
  blog.url = body.url ? body.url : blog.url
  blog.likes = body.likes ? body.likes : blog.likes
  blog.author = body.author ? body.author : blog.author

  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter
