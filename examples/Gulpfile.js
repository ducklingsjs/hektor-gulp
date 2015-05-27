var gulp = require('gulp');

// H is an object with following properties:
// * deps (HEKTOR's gulp deps)
// * tasks (loaded HEKTOR tasks)
// * config - paths, task configs
var H = require('hektor-gulp')(gulp, { app: 'app', dist: 'dist', tmp: '.tmp'}).load({
  styles: {
    browsers: ['chrome 40', 'ios 7']
  },
  scripts: {
    moduleSystemConfig: {
      aliases: {
        underscore: 'lodash'
      }
    }
  },
  serve: {}
}, true); // 2nd argument is "lazy" - should tasks be loaded only when they're needed (experimental)

// Load receives a task name, array of task names or object with taskName: taskOptions
// var H = require('hektor-gulp')(gulp).load('styles');

// gulp.task('scss', ['styles'], function() {}); // Alias for styles, could also contain other tasks
