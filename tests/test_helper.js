const Blog = require("../models/blog");

const initialBlogs = [
  { title: "Asdi", author: "Meat", likes: 3, id: 5, url: "fsdf" },
  { title: "Asasdasdi", author: "Medasdaat", likes: 3, id: 56, url: "dasda" },
];

const nonExistingId = async () => {
  const blog = new Blog({ author: "3123", title: 'adsda', url: 'dasda' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blog = await Blog.find({});
  return blog.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
