module.exports = function(gulp, H, options) {
  gulp.task(options.taskName, function(done) {
    H.loadDeps([].concat(options.deps));
    return options.task(H, options, done);
  });
};
