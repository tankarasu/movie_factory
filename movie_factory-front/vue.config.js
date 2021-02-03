module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/movie_factory/"
      : "/",
  outputDir:
    process.env.NODE_ENV === "production"
      ? "../docs"
      : "dist",
};
