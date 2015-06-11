module.exports = function(gulp, H, options) {

  gulp.task(options.taskName, function() {
    H.loadDeps(['plumber', 'notify', 'connect']);

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
      if (options.bower) {
        var debowerify = require('debowerify');
        transforms.push(debowerify);
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

      H.loadDeps('browserify2');
      stream = stream.pipe(H.deps.browserify2({
        fileName: options.filename,
        transform: transforms,
        options: {
          paths: options.moduleSystemConfig.nodePath,
          debug: !!options.debug
        }
      }))
    } else {
      if (options.debug) {
        H.loadDeps('sourcemaps');
        stream = stream.pipe(H.deps.sourcemaps.init());
      }
      if (options.transpiler === 'babel') {
        H.loadDeps('babel');
        stream = stream.pipe(H.deps.babel(options.transpilerOptions));
      }
      if (options.debug) {
        stream = stream.pipe(H.deps.sourcemaps.write('.'));
      }
      if (options.templates === 'handlebars') {
        H.loadDeps(['handlebars', 'wrap', 'declare', 'concat']);
        var tmpl = gulp.src(options.templateOptions.src)
          .pipe(H.deps.handlebars(options.transpilerOptions))
          .pipe(H.deps.wrap('Handlebars.template(<%= contents %>)'))
          .pipe(H.deps.declare({
            namespace: options.templateOptions.namespace,
            noRedeclare: true, // Avoid duplicate declarations 
          }))
          .pipe(H.deps.concat('templates.js'))
          .pipe(gulp.dest(options.dest));
      }
    }

    return stream.pipe(gulp.dest(options.dest))
      .pipe(H.deps.connect.reload());
  });
};
