import minify from 'minify';
const options = {
  html: {
      collapseWhitespace: true,
      removeAttributeQuotes: false,
      removeComments: true
  },
  js: {
      ecma: 5,
  },
  img: {
      maxSize: 4096,
  },
};

minify('./src/*', options)
    .then(console.log)
    .catch(console.error);