module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://tankarasu.github.io/movie_factory/"
      : "/",
  outputDir:
    process.env.NODE_ENV === "production"
      ? "../docs"
      : "dist",
};
