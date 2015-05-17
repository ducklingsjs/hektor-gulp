module.exports = {
  src: {
    js: '<%= paths.app %>/scripts/**/*.js',
    scss: '<%= paths.app %>/styles/**/*.scss'
  },
  config: {
    // js: '../../.jshintrc',
    scss: '.scss-lint.yml'
  },
  fail: false
};
