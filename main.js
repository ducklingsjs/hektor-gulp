var path = require('path');
var _ = require('lodash');
var moduleOptions = require('./utils/module-options');

module.exports = function(gulp, paths) {

  // Load the HEKTOR gulp dependencies
  var H = {
    deps: require('gulp-load-plugins')({
      // We need to set the package.json path manually or it will take the project package, and we don't want that
      config: path.normalize(__dirname + '/package.json')
    }),
    tasks: {},
    run: require('run-sequence').use(gulp),
    config: {
      paths: paths || {
        app: 'app',
        dist: 'dist'
      }
    },
    load: loadModules
  };

  function loadModules(modules) {
    // Transform the argument into an object where keys are task names and values are task options
    modules = modules || {};
    if (typeof modules === 'string') {
      modules = [].concat(modules);
    }
    if (modules instanceof Array) {
      modules = _.zipObject(modules);
    }

    // Prepare all configs before tasks start to load
    // in order to have configs ready for internal dependencies
    _.each(modules, function(options, module) {
      if (H.config[module]) {
        // Already loaded
        return;
      }

      // Load the default options and merge them with the received ones
      var defaults = require('./config/' + module);
      options = moduleOptions(defaults, options, H.config);
      H.config[module] = options;
    });

    _.each(modules, function(options, module) {
      if (H.tasks[module]) {
        // Already loaded
        return;
      }

      // sass task is also documented
      H.tasks[module] = require('./tasks/' + module)(gulp, H, H.config[module]);
    });

    return H;
  }

  return {
    loadAll: function() {
      console.error('Not implemented yet!');
      // TODO: Iterate trough files in the tasks folder
    },
    load: loadModules
  }
};
