var merge = require('merge-stream');

module.exports = function(gulp, H, options) {
  return gulp.task(options.taskName, function() {
    H.loadDeps(['jshint', 'scss-lint']);

    var jsstream = gulp.src(options.src.js)
      .pipe(H.deps.jshint())
      .pipe(H.deps.jshint.reporter('jshint-stylish'));
      
    var scssstream = gulp.src(options.src.scss)
      .pipe(H.deps['scss-lint']({
        config: options.config.scss,
        endless: !options.fail
      }));

    if (options.fail) {
      jsstream = jsstream.pipe(H.deps.jshint.reporter('fail'));
      scssstream = scssstream.pipe(H.deps['scss-lint'].failReporter());
    }

    return merge(jsstream, scssstream);
  });
};
