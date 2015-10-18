var exec = require('child_process').exec

module.exports = function(gulp, H, options) {
  return function(done) {
    var cmd = options.command;
    if (typeof cmd === 'function') {
      cmd = cmd();
    }
    exec(cmd, function(err, stdout, stderr) {
      done(err);
      if (options.stdout) {
        console.log(stdout);
      }
      if (options.stderr) {
        console.error(stderr);
      }
    });
  };
};
