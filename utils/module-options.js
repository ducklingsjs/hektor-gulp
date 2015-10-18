var _ = require('lodash');
_.mergeDefaults = require('merge-defaults');

module.exports = function(defaults, options, templateOpts) {
  var opts = _.mergeDefaults({}, options || {}, defaults);

  function prepareTemplates(opts) {
    if (opts instanceof Array) {
      return opts.map(prepareTemplates);
    } else if (typeof opts === 'object') {
      return _.mapValues(opts, prepareTemplates);
    } else if (typeof opts === 'string') {
      return _.template(opts)(templateOpts);
    } else {
      return opts;
    }
  };

  return prepareTemplates(opts);
};
