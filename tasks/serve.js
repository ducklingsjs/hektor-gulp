var _ = require('lodash');

module.exports = function(gulp, H, options) {
  // Get all tasks that are called, and run them before the server is started
  // Is it safe to do compact here?
  var deps = _(options.watch).pluck('tasks').flatten().compact().value();

  H.load(options.server);

  gulp.task(options.taskName, function() {

    H.run(deps, options.server, function() {
      _.each(options.watch, function(watcher) {
        gulp.watch(watcher.path, watcher.tasks);
      });
    });
  });
};
