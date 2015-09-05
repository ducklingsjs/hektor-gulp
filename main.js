var _ = require('lodash');

module.exports = function(gulp, paths) {
  'use strict';

  var H = {
    deps: {}, // Don't load modules if you don't have to
    tasks: {},
    config: {
      paths: _.extend({ app: 'app', dist: 'dist', tmp: '.tmp' }, paths || {})
    }
  };

  var loader = require('./utils/module-loader')(gulp, H);

  H.loadDeps = loader.deps;
  H.load = loader.tasks;
  H.run = require('run-sequence').use(gulp);

  return {
    load: loader.tasks
  };
};
