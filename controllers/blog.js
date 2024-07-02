const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.vies || 0
  }) 

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
});

module.exports = blogRouter;
