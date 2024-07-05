const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'Legacy Optimization Executive', author: 'David Pouros', likes: 9, id: 5, url: 'https://dimwitted-symmetry.info' },
  { title: 'Human Tactics Supervisor', author: 'Doyle Mayer DVM', likes: 7, id: 56, url: 'http://vast-extinction.net' },
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'Marjorie West', title: 'Chief Marketing Planner', url: 'http://sturdy-blowhole.info' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
