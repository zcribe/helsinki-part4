const dummy = (blogs) => {
  return 1
  // ...
}

const totalLikes = () => {
  return 5
}

const favoriteBlog = (blogs) => {
  let mostLikedCount = 0
  let mostLikedId = 0

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedCount) {
      mostLikedCount = blogs[i].likes
      mostLikedId = i
    }
  }
  return blogs[mostLikedId]
}

const mostBlog = (blogs) => {
  let statistics = {}

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    if (author in statistics) {
      statistics[author] += 1
    } else {
      statistics[author] = 0
    }
  }

  let max = 0
  let maxKey = ''

  for (let key in statistics) {
    if (statistics[key] > max) {
      max = statistics[key]
      maxKey = key
    }
  }

  let output = {}
  output[maxKey] = statistics[maxKey]

  return output
}

const mostLikes = (blogs) => {
  let statistics = {}

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    if (author in statistics) {
      statistics[author] += blogs[i].likes
    } else {
      statistics[author] = blogs[i].likes
    }
  }

  let max = 0
  let maxKey = ''

  for (let key in statistics) {
    if (statistics[key] > max) {
      max = statistics[key]
      maxKey = key
    }
  }

  let output = {}
  output[maxKey] = statistics[maxKey]

  return output
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}
