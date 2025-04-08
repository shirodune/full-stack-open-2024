const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithBiggerBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithBiggerBlog);
    assert.strictEqual(result, 18);
  });
});

describe("favorite blog", () => {
  const listWithBiggerBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "hello",
      author: "Edsge",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "world",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
  ];

  test("favorite blog is right", () => {
    const result = listHelper.favoriteBlog(listWithBiggerBlog);
    const ans = {
      title: "hello",
      author: "Edsge",
      likes: 8,
    };
    assert.deepStrictEqual(result, ans);
  });
});

describe("most blogs", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "hello",
      author: "Edsge",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "world",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "world2",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
  ];
  test("most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    const ans = {
      author: "Dijkstra",
      blogs: 2,
    };
    assert.deepEqual(result, ans);
  });
});

describe("most likes", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1722",
      title: "Go To",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 105,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "hello",
      author: "Edsge",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "hello2",
      author: "Edsge",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 208,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "world",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "world2",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 7,
      __v: 0,
    },
  ];
  test("most likes", () => {
    const result = listHelper.mostLikes(blogs);
    const ans = {
      author: "Edsge",
      likes: 216,
    };
    assert.deepEqual(result, ans);
  });
});
