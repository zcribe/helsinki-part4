const dummy = (blogs) => {
  return 1;
  // ...
};

const totalLikes = () => {
  return 5;
};

const favoriteBlog = (blogs) => {
  let mostLikedCount = 0;
  let mostLikedId = 0;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedCount) {
      mostLikedCount = blogs[i].likes;
      mostLikedId = i;
    }
  }
  return blogs[mostLikedId];
};

const mostBlog = (blogs) => {
  // input array of blogs [{author: "", 3},{},{}]

  let statistics = {};

  // foreach blog
  // check if author in dict
  // if in dict add 1
  // else create new entry

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    if (author in statistics) {
      statistics[author] += 1;
    } else {
      statistics[author] = 0;
    }
  }

  let max = 0;
  let maxKey = "";

  for (let key in statistics) {
    if (statistics[key] > max) {
      max = statistics[key];
      maxKey = key;
    }
  }
  let output = {};
  output[maxKey] = statistics[maxKey];

  return output;

  // output author with most entries {author: "", blogs: 3}
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
};
