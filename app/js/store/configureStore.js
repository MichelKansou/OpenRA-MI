// Use DefinePlugin (Webpack) or loose-envify (Browserify)
// together with Uglify to strip the dev branch in prod build.
if (process.env.NODE_ENV === 'development') {
    // For developement
  module.exports = require('./configureStore.dev');
} else {
    // For production
  module.exports = require('./configureStore.prod');
}
