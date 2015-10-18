var Utils = require('../utils/helpers');

module.exports = function(gulp, H, options) {
  return function() {
    H.loadDeps(['replace']);

    options.dest = options.dest || './';

    gulp.src(options.src, { base: './' })
      .pipe(H.deps.replace(Utils.getValue(options.from), options.to))
      .pipe(gulp.dest(options.dest));
  };
};
