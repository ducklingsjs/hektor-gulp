'use strict';

module.exports = function(gulp, H, options) {
  gulp.task(options.taskName, function() {
    H.loadDeps(['zip']);
    return gulp.src(options.src)
      .pipe(H.deps.zip(options.filename, options.options))
      .pipe(gulp.dest(options.dest));
  });
};
