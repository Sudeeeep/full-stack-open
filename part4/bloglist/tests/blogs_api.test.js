const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

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

describe("adding blogs to DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("blog post can be added", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogToAdd = {
      title: "TEST BLOG",
      author: "QWERTY",
      url: "blogs.com/QWERTY",
      likes: 20,
    };

    await api
      .post("/api/blogs")
      .send(blogToAdd)
      .set("authorization", `bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterAdding = await Blog.find({});

    const title = blogsAfterAdding.map((blog) => blog.title);
    const author = blogsAfterAdding.map((blog) => blog.author);

    expect(blogsAfterAdding).toHaveLength(initialBlogList.length + 1);
    expect(title).toContain("TEST BLOG");
    expect(author).toContain("QWERTY");
  });

  test("likes default to zero if it is missing", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogToAdd = {
      title: "TEST BLOG WITHOUT LIKES",
      author: "NO LIKES",
      url: "blogs.com/NOLIKES",
    };

    await api
      .post("/api/blogs")
      .send(blogToAdd)
      .set("authorization", `bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterAdding = await Blog.find({});

    const likes = blogsAfterAdding.map((blog) => blog.likes);

    expect(likes).toContain(0);
  });

  test("title or url are missing", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogToAdd = {
      author: "NO LIKES",
      likes: 20,
    };

    await api
      .post("/api/blogs")
      .send(blogToAdd)
      .set("authorization", `bearer ${loggedUser.body.token}`)
      .expect(400);
  });

  test("adding a blog fails if token is not provided", async () => {
    const blogToAdd = {
      title: "TEST BLOG WITHOUT LIKES",
      author: "NO LIKES",
      url: "blogs.com/NOLIKES",
      likes: 20,
    };

    const response = await api
      .post("/api/blogs")
      .send(blogToAdd)
      .expect("Content-Type", /application\/json/)
      .expect(401);

    expect(response.body.error).toContain("jwt must be provided");
  });
});

describe("delete blogs from DB", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();

    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogstoAdd = [
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

    for (let blog of blogstoAdd) {
      await api
        .post("/api/blogs")
        .send(blog)
        .set("authorization", `bearer ${loggedUser.body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    }
  });

  test("delete blog with valid id", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogs = await Blog.find({});

    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `bearer ${loggedUser.body.token}`)
      .expect(204);

    const blogsAfterDelete = await Blog.find({});
    const title = blogsAfterDelete.map((blog) => blog.title);

    expect(blogsAfterDelete).toHaveLength(blogs.length - 1);
    expect(title).not.toContain("ABCD");
  });
});

// test("update a blog", async () => {
//   const blogs = await Blog.find({});
//   let blogToUpdate = {
//     title: blogs[0].title,
//     author: blogs[0].author,
//     url: blogs[0].url,
//     likes: 99,
//   };

//   await api.put(`/api/blogs/${blogs[0].id}`).send(blogToUpdate).expect(200);

//   const blogsAfterUpdating = await Blog.find({});

//   const updatedBlog = blogsAfterUpdating.find(
//     (blog) => blog.title === blogToUpdate.title
//   );

//   expect(updatedBlog.likes).toBe(blogToUpdate.likes);
// });

describe("when there is initially one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("user is successfully created with fresh username", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain("mluukkai");
  });

  test("user creation fails if username is already taken", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "root",
      name: "hello",
      password: "test123",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails if username is less than 3 characters long", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "ro",
      name: "hello",
      password: "test123",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username: must be atleast 3 characters long"
    );

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails if password is less than 3 characters long", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "testuser",
      name: "hello",
      password: "te",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password: must be atleast 3 characters long"
    );

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
afterAll(async () => await mongoose.connection.close());
