const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Poggers',
    author: 'Dyanamo',
    url: 'dynamosite.com',
    likes: 10,
    user: '623c1b2248cb85c76de33638',
  },
  {
    title: 'Turkey Sandwich',
    author: 'Jeremy',
    url: 'jeremycooking.com',
    likes: 2,
    user: '623c1b2248cb85c76de33638',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Poggers' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDB,
}
