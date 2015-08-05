module.exports = function(gulp, H, options) {
  'use strict';

  return gulp.task(options.taskName, function() {
    H.loadDeps(['postcss']);

    options.dest = options.dest || './';

    var processors = options.processors.map(function(proc) {
      if (proc instanceof Array) {
        var plugin = require(proc[0]);
        proc = plugin.apply(plugin, proc.slice(1));
      }
      return proc;
    });

    gulp.src(options.src, { base: './' })
      .pipe(H.deps.postcss(processors, {
        from: options.src
      }))
      .pipe(gulp.dest(options.dest));
  });
};
