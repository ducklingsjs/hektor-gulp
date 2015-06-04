var _ = require('lodash');

module.exports = function(gulp, H, options) {
  H.load(_.flatten(options.tasks));

  gulp.task(options.taskName, function (cb) {
    var sequence = options.tasks.slice();
    sequence.push(cb);
    H.run.apply(H, sequence);
  });
};
