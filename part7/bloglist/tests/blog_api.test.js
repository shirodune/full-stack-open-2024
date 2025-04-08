const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_hepler");
const logger = require("../utils/logger");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/Blog");
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("when there are some blogs saved initially", () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();

    await Blog.deleteMany({});
    await Blog.insertMany(
      helper.initialBlogs.map((blog) => ({
        ...blog,
        user: user._id.toString(),
      })),
    );
    const response = await api
      .post("/api/login")
      .set("Authorization", token)
      .send({ username: "root", password: "sekret" });
    token = "Bearer " + response.body.token;
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs").set("Authorization", token);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("the unique identifier property of the blog is named id", async () => {
    const response = await api.get("/api/blogs").set("Authorization", token);
    const blogs = response.body;

    assert("id" in blogs[0]);
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid data ", async () => {
      const newBlog = {
        title: "test",
        author: "abc",
        url: "https",
        likes: 4,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
    });

    test("succeeds with missing like", async () => {
      const newBlog = {
        title: "test",
        author: "abc",
        url: "https",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();
      const savedBlog = blogs.find((blog) => blog.title === "test");
      assert.strictEqual(savedBlog.likes, 0);
    });

    test("fails with status code 401 if token is missing", async () => {
      const newBlog = {
        author: "abc",
        url: "https",
      };

      const result = await api.post("/api/blogs").send(newBlog).expect(401);
      assert(result.body.error.includes("token invalid"));

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });

    test("fails with status code 400 if title invalid", async () => {
      const newBlog = {
        author: "abc",
        url: "https",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });

    test("fails with status code 400 if url invalid", async () => {
      const newBlog = {
        title: "test",
        author: "abc",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", token)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  describe("updation of a blog", () => {
    test("succeeds if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = {
        title: "test",
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: blogsAtStart[0].likes,
      };

      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .set("Authorization", token)
        .send(blogToUpdate);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(titles.includes(blogToUpdate.title));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
