var moduleOptions = require('./module-options');
var _ = require('lodash');

module.exports = function(gulp, H) {

  function normalizeConfigs(modules) {
    // Transform the argument into an object where keys are task names and values are task options
    var modulesObj = {};
    if (typeof modules === 'string') {
      modulesObj[modules] = {};
    } else if (modules instanceof Array) {
      _.each(modules, function(moduleName) {
        modulesObj[moduleName] = {};
      });
    } else {
      modulesObj = modules || modulesObj;
    }

    return modulesObj;
  }

  function prepareConfigs(modules) {
    // Prepare all configs before tasks start to load
    // in order to have configs ready for internal dependencies
    _.each(modules, function(options, module) {
      if (H.config[module]) {
        // Already loaded
        return;
      }

      // Support for task renaming
      options.taskName = module;
      options.moduleName = options.moduleName || module;

      // Load the default options and merge them with the received ones
      var defaults = require('../config/' + options.moduleName);
      options = moduleOptions(defaults, options, H.config);
      H.config[module] = options;
    });
  }

  return {
    deps: function(deps) {
      deps = [].concat(deps);
      deps.forEach(function(name) {
        if (H.deps[name]) {
          // Already loaded
          return;
        }

        H.deps[name] = require('gulp-' + name);
      });
    },

    tasks: function(modules) {
      modules = normalizeConfigs(modules);
      prepareConfigs(modules);
      _.each(modules, function(options, module) {
        if (H.tasks[module]) {
          // Already loaded
          return;
        }

        // styles task is also documented
        H.tasks[module] = require('../tasks/' + H.config[module].moduleName)(gulp, H, H.config[module]);
      });
      return H;
    }
  };
};