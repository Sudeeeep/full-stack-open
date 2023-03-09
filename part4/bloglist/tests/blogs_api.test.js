const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogList = [
  {
    title: "ABCD",
    author: "Sudeep Nair",
    url: "blogs.com/ABCD",
    likes: 7,
  },
  {
    title: "XYZ",
    author: "Sebastian Vettel",
    url: "blogs.com/ABCD",
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogList) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("correct number of blogs are returned in JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(initialBlogList.length);
});

test("id exists", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((r) => {
    expect(r.id).toBeDefined();
  });
});

test("blog post can be added", async () => {
  const blogToAdd = {
    title: "TEST BLOG",
    author: "QWERTY",
    url: "blogs.com/QWERTY",
    likes: 20,
  };

  await api
    .post("/api/blogs")
    .send(blogToAdd)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterAdding = await api.get("/api/blogs");

  const title = blogsAfterAdding.body.map((blog) => blog.title);
  const author = blogsAfterAdding.body.map((blog) => blog.author);

  expect(blogsAfterAdding.body).toHaveLength(initialBlogList.length + 1);
  expect(title).toContain("TEST BLOG");
  expect(author).toContain("QWERTY");
});

afterAll(async () => await mongoose.connection.close());
