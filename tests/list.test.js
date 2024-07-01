const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

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

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});



describe("favourite blog", () => {
  const listWithBlogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 4
    },
    {
      title: "Mega Canonical",
      author: "W.",
      likes: 12
    },
    {
      title: "Peer reduction",
      author: "Dijkstra",
      likes: 2
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(listWithBlogs);
    assert.deepStrictEqual(result, listWithBlogs[1]);
  });
});


describe("most blog", () => {
  const listWithBlogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 4
    },
    {
      title: "Mega Canonical",
      author: "W.",
      likes: 12
    },
    {
      title: "Mega Canonical",
      author: "W.",
      likes: 12
    },
    {
      title: "Mega Canonical",
      author: "W.",
      likes: 12
    },
    {
      title: "Peer reduction",
      author: "Dijkstra",
      likes: 2
    },
  ];

  const expectedResult = {'W.': 2 };

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostBlog(listWithBlogs);
    assert.deepStrictEqual(result, expectedResult);
  });
});