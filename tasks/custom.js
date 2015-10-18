module.exports = function(gulp, H, options) {
  return {
    deps: [].concat(options.before),
    fn: function(done) {
      H.loadDeps([].concat(options.deps));
      return options.task(H, options, done);
    }
  };
};
