var nodePath = ['./<%= paths.app %>/scripts'];
if (process.env.NODE_PATH) {
  var paths = process.env.NODE_PATH.split(':');
  nodePath = paths.concat(nodePath);
}

module.exports = {
  src: '<%= paths.app %>/scripts/main.js',
  filename: 'main.js',
  moduleSystem: 'browserify',
  transpiler: null,
  templates: 'handlebars',
  dest: '.tmp/scripts',
  debug: false,
  moduleSystemConfig: {
    aliases: {},
    nodePath: nodePath
  },
  transpilerOptions: {}
};
