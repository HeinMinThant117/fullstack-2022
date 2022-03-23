const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let max = 0
  let favorite = {}
  for (let i = 0; i < blogs.length; i++) {
    if (max < blogs[i].likes) {
      max = blogs[i].likes
      favorite.title = blogs[i].title
      ;(favorite.author = blogs[i].author), (favorite.likes = blogs[i].likes)
    }
  }

  return favorite
}

const mostBlogs = (blogs) => {
  const authorWithBlogs = lodash.groupBy(blogs, 'author')
  let mostBlogs = 0
  let author = {}
  lodash.forEach(authorWithBlogs, function (value, key) {
    if (mostBlogs < value.length) {
      author.author = key
      author.blogs = value.length
    }
  })

  return author
}

const mostLikes = (blogs) => {
  const authorWithBlogs = lodash.groupBy(blogs, 'author')
  let maxLikes = 0
  let author = {}
  lodash.forEach(authorWithBlogs, function (value, key) {
    let totalLikes = value.reduce((sum, item) => sum + item.likes, 0)
    if (maxLikes < totalLikes) {
      author.author = key
      author.likes = totalLikes

      maxLikes = totalLikes
    }
  })

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
