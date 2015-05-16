module.exports = {
  server: 'connect',
  watch: {
    {
      path: '<%= paths.app %>/styles/{,**/}*.scss',
      tasks: ['styles']
    }, {
      path: '<%= paths.app %>/scripts/{,**/}*.{js,hbs}',
      tasks: ['scripts']
    }
  }
};
