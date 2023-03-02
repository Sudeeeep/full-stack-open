const logger = require("./logger");

const dummy = (blogs) => {
  logger.info(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs
    .map((blog) => ({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }))
    .reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr), {
      title: "",
      author: "",
      likes: 0,
    });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author); //new array with only authors

  // Count blogs by author
  const countBlogsByAuthor = authors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1);
    return acc;
  }, {});

  const authorWithMostBlogs = Object.entries(countBlogsByAuthor).reduce(
    (prev, curr) => {
      return prev[1] > curr[1] ? prev : curr;
    }
  );

  return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((prev, curr) => {
    prev[curr.author] = prev[curr.author] || 0;
    prev[curr.author] += curr.likes;
    return prev;
  }, {});

  const authorWithMostLikes = Object.entries(authorLikes).reduce((prev, curr) =>
    prev[1] > curr[1] ? prev : curr
  );

  return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
