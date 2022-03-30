const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response
        .status(400)
        .json({ error: "blog doesn't exist or is already deleted" })
    }
    if (blog.user.toString() === request.user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response
        .status(401)
        .json({ error: 'unauthorized to delete this blog post' })
    }
  }
)

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    const user = await User.findById(request.user.id)

    if (!body.title || !body.url) {
      response.status(400).json({ error: 'No title or url provided' })
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id,
        comments: [],
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      savedBlog.user = user

      response.status(201).json(savedBlog)
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  let blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  let body = request.body

  blog.title = body.title ? body.title : blog.title
  blog.url = body.url ? body.url : blog.url
  blog.likes = body.likes ? body.likes : blog.likes
  blog.author = body.author ? body.author : blog.author
  blog.comments = body.comments ? body.comments : blog.comments

  let newBlog = await blog.save()

  response.status(200).json(newBlog)
})

module.exports = blogsRouter
