const Blog = require("../models/blog");

const initialBlog = [
  { title: "Asdi", author: "Meat", likes: 3, id: 5 },
  { title: "Asasdasdi", author: "Medasdaat", likes: 3, id: 56 },
];

const nonExistingId = async () => {
  const blog = new Blog({ author: "3123" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blog = await Blog.find({});
  return blog.map((blog) => blog.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  blogsInDb,
};
