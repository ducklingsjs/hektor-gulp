'use strict';

module.exports = function(gulp, H, options) {

  return function() {
    H.loadDeps(['connect']);

    var scriptOptions = H.config.scripts;
    var stream;

    if (scriptOptions.moduleSystem === 'browserify') {
      var source = require('vinyl-source-stream');
      var browserify = require('browserify');
      var b = browserify();
      b.add(__dirname + '/../utils/noop.js');

      scriptOptions.moduleSystemConfig.vendors.forEach(function(lib) {
        b.require(lib);
      });

      stream = b.bundle().pipe(source('vendor.js'));
    }

    return stream
      .pipe(gulp.dest(scriptOptions.dest))
      .pipe(H.deps.connect.reload());
  };
};
