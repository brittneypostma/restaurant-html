module.exports = {
  root: "src/",
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  buildOptions: {
    out: 'build/',
  },
  devOptions: {
    open: "none"
  }
}