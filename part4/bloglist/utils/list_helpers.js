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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}