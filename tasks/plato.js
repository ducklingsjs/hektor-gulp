// plato -q -d reports -r -l .jshintrc -t AMK -x "app/bower_components/*|app/scripts/vendor/*|app/scripts/views-old/*" app/*

var execTask = require('./exec');

module.exports = function(gulp, H, options) {
  var execOptions = {
    taskName: options.taskName,
    command: function() {
      // Run plato in quiet mode
      var cmd = ['plato -q'];

      // Set the report folder
      cmd.push('-d ' + options.reportFolder);

      // Recursive
      cmd.push('-r');

      // Enable jshint
      if (options.jshint) {
        cmd.push('-l ' + options.jshint);
      }

      // Set the report name
      cmd.push('-t ' + options.name);

      // Exclude folders
      if (options.excludes) {
        cmd.push('-x "' + options.excludes + '"');
      }

      // Set the app path
      cmd.push(options.path);

      return cmd.join(' ');
    }
  };

  return execTask(gulp, H, execOptions);
};
