var _ = require('lodash');

module.exports = function(gulp, H, options) {
  // Get all tasks that are called, and run them before the server is started
  // Is it safe to do compact here?
  var deps = _(options.watch)
    .pluck('tasks').flatten().compact()
    .push(options.server)
    .value();

  H.load(deps);

  gulp.task(options.taskName, deps, function() {
    _.each(options.watch, function(watcher) {
      gulp.watch(watcher.path, watcher.tasks);
    });
  });
};
