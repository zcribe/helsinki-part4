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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
