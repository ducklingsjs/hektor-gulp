var exec = require('child_process').exec

module.exports = function(gulp, H, options) {
  gulp.task(options.taskName, function(done) {
    var cmd = options.command;
    if (typeof cmd === 'function') {
      cmd = cmd();
    }
    exec(cmd, function(err, stdout, stderr) {
      done(err);
    });
  });
};
