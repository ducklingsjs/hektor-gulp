var Utils = require('../utils/helpers');

module.exports = function(gulp, H, options) {
  return gulp.task(options.taskName, function() {
    H.loadDeps(['replace']);

    options.dest = options.dest || './';

    gulp.src(options.src, { base: './' })
      .pipe(H.deps.replace(Utils.getValue(options.from), Utils.getValue(options.to)))
      .pipe(gulp.dest(options.dest));
  });
};
