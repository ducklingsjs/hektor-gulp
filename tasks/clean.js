var del = require('del');

module.exports = function(gulp, H, options) {
  return function (cb) {
    if (options.paths) {
      del([].concat(options.paths), cb);
    } else {
      cb('Path is empty');
    }
  };
};
