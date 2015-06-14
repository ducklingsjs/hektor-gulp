var fs = require('fs-extra');
var path = require('path');
var async = require('async');

module.exports = function(gulp, H, options) {
  gulp.task(options.taskName, function(done) {
    var dest = options.dest;
    async.eachSeries(options.paths, function(src, cb) {
      var name = path.basename(src);
      fs.copy(src, path.normalize(dest + '/' + name), cb);
    }, done);
  });
};
