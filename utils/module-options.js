var _ = require('lodash');

module.exports = function(defaults, options, templateOpts) {
  var opts = _.extend({}, defaults, options || {});
  
  function prepareTemplates(opts) {
    if (opts instanceof Array) {
      return opts.map(prepareTemplates);
    } else if (typeof opts === 'object') {
      return _.mapValues(opts, prepareTemplates);
    } else if (typeof opts === 'string') {
      return _.template(opts, templateOpts);
    } else {
      return opts;
    }
  };

  return prepareTemplates(opts);
};
