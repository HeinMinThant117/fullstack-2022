const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Poggers',
    author: 'Dyanamo',
    url: 'dynamosite.com',
    likes: 10,
  },
  {
    title: 'Turkey Sandwich',
    author: 'Jeremy',
    url: 'jeremycooking.com',
    likes: 2,
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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
