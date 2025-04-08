const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const result = await savedBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (request.user !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: "token invalid" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id);

  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1, id: 1 });
  response.json(updateBlog);
});

module.exports = blogsRouter;
