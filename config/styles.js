module.exports = {
  src: '<%= paths.app %>/styles/main.scss',
  includePaths: [
    '<%= paths.app %>/bower_components'
  ],
  browsers: [
    'last 2 versions',
    'ie 10'
  ],
  dest: '.tmp/styles'
};
