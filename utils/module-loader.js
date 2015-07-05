var gutil = require('gulp-util');
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

      // If task options is an array, assume it's a sequence task
      // If task options is a function, assume it's a custom task
      if (options instanceof Array) {
        options = {
          moduleName: 'sequence',
          tasks: options
        };
      } else if (typeof options === 'function') {
        options = {
          moduleName: 'custom',
          task: options
        };
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

  function loadTask(taskName) {
    if (H.tasks[taskName]) return; // Already set

    // styles task is also documented
    var config = H.config[taskName];
    H.tasks[taskName] = require('../tasks/' + config.moduleName)(gulp, H, config);
  }

  return {
    deps: function(deps) {
      deps = [].concat(deps);
      deps.forEach(function(name) {
        if (H.deps[name]) return; // Already loaded

        H.deps[name] = require('gulp-' + name);
      });
    },

    tasks: function(modules, lazy) {
      modules = normalizeConfigs(modules);
      prepareConfigs(modules);

      if (lazy) {
        // gulp uses minimist for this, but I think it would be an overkill here (and perf overhead)
        var invokedTasks = process.argv.slice(2);

        _.each(invokedTasks, function(invokedTask) {
          if (modules[invokedTask]) {
            loadTask(invokedTask);
          } else {
            try {
              var opts = {};
              opts[invokedTask] = {};
              prepareConfigs(opts);
              // modules[invokedTask] = {};
              loadTask(invokedTask);
              gutil.log('Autoloading task "' + invokedTask + '"');
            } catch(e) {
              gutil.log('Autoloading task "' + invokedTask + '" failed:', e);
            }
          }
        });
      } else {
        _.each(_.keys(modules), loadTask);
      }
      return H;
    }
  };
};
