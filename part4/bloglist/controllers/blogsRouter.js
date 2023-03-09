const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
