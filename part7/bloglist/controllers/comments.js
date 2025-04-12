const commentsRouter = require("express").Router();
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

commentsRouter.post("/", async (request, response) => {
  const { content, blogId } = request.body;

  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  const blog = await Blog.findById(blogId)

  const comment = new Comment({
    content,
    blog: blogId
  });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id) 

  await blog.save()

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
