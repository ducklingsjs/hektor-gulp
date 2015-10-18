var _ = require('lodash');

module.exports = function(gulp, H, options) {
  H.load(_.flatten(options.tasks));

  return function (cb) {
    var sequence = options.tasks.slice();
    sequence.push(cb);
    H.run.apply(H, sequence);
  };
};
