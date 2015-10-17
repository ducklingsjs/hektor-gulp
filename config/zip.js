module.exports = {
  src: '<%= paths.dist %>/src/*',
  dest: '<%= paths.dist%>/pack',
  filename: 'archive.zip',
  options: {
    compress: true
  }
};
