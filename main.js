module.exports = function(gulp, paths) {
  var H = {
    deps: {}, // Don't load modules if you don't have to
    tasks: {},
    config: {
      paths: paths || {
        app: 'app',
        dist: 'dist'
      }
    }
  };

  var loader = require('./utils/module-loader')(H);

  H.loadDeps = loader.deps;
  H.load = loader.tasks;

  return {
    load: loader.tasks
  }
};
