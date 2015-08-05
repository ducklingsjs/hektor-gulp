module.exports = {
  src: '<%= paths.app %>/styles/main.css',
  processors: [
    ['autoprefixer', {browsers: ['last 1 version']}]
  ],
  dest: '<%= paths.tmp %>/styles'
};
