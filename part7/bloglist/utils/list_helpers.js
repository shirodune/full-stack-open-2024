const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.map(blog => blog.likes).reduce((a, b) => a+b, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce(function(prev, current) {
    return (prev && prev.likes > current.likes) ? prev : current
  })
  const returnMax = {
    title: max.title,
    author: max.author,
    likes: max.likes
  }
  return returnMax
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const author = _.maxBy(_.map(_.groupBy(authors), author => ({author: author[0], blogs: author.length})), 'blogs')
  return author
}

const mostLikes = (blogs) => {
  const author = _.maxBy(_.map(_.groupBy(blogs, 'author'), blog => ({author: blog[0].author, likes: blog.reduce((a, b) => a + b.likes, 0)})), 'likes')
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}