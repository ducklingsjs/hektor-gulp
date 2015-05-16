module.exports = function(gulp, H, options) {

  gulp.task(options.taskName, function() {
    var stream = gulp.src(options.src)
      .pipe(H.deps.plumber({
        errorHandler: H.deps.notify.onError('Scripts: <%= error.message %>')
      }));

    if (options.moduleSystem === 'browserify') {
      var transforms = [];
      if (options.transpiler === 'babel') {
        var babelify = require('babelify');
        transforms.push(babelify.configure(options.transpilerOptions));
      }
      if (Object.keys(options.moduleSystemConfig.aliases).length) {
        var aliasify = require('aliasify');
        transforms.push({
          tr: aliasify,
          options: { aliases: options.moduleSystemConfig.aliases }
        });
      }
      if (options.templates === 'handlebars') {
        var hbsfy = require('hbsfy');
        transforms.push({
          tr: hbsfy,
          options: {
            compiler: 'require("hektor-gulp/node_modules/hbsfy/runtime")'
          }
        });
      }

      stream = stream.pipe(H.deps.browserify2({
        fileName: options.filename,
        transform: transforms,
        options: {
          paths: options.moduleSystemConfig.nodePath,
          debug: !!options.debug
        }
      }))
    }

    return stream.pipe(gulp.dest(options.dest))
      .pipe(H.deps.connect.reload());
  });
};
