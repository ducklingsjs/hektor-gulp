module.exports = {
  script: 'index.js',
  ext: 'js',
  ignore: [
    '<%= paths.tmp %>/',
    '<%= paths.app %>/',
    '<%= paths.dist %>/',
    'node_modules/'
  ],
  env: {}
};
