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

afterAll(async () => await mongoose.connection.close());
