'use strict';

module.exports = function(gulp, H, options) {

  return function() {
    H.loadDeps(['plumber', 'notify', 'connect']);
    var stream;

    if (options.moduleSystem === 'browserify') {
      var transforms = [];
      if (options.transpiler === 'babel') {
        var babelify = require('babelify');
        transforms.push({
          tr: babelify.configure(options.transpilerOptions),
          options: null
        });
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
        transforms.push({
          tr: debowerify,
          options: null
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

      var source = require('vinyl-source-stream');
      var browserify = require('browserify');
      var b = browserify({
        paths: options.moduleSystemConfig.nodePath,
        debug: !!options.debug
      });
      b.add(options.src);

      transforms.forEach(function(t) {
        b.transform(t.tr, t.options);
      });

      options.moduleSystemConfig.vendors.forEach(function(lib) {
        b.external(lib);
      });

      stream = b.bundle()
        .pipe(source(options.filename))
        .pipe(H.deps.plumber({
          errorHandler: H.deps.notify.onError('Scripts: <%= error.message %>')
        }));
    } else if (options.moduleSystem === 'dart') {
      H.loadDeps(['dart']);
      return gulp.src(options.src)
        .pipe(H.deps.dart({
          dest: options.dest,
          verbose: options.debug,
          minify: !options.debug
        }))
        .pipe(H.deps.connect.reload());
    } else {
      stream = gulp.src(options.src)
      .pipe(H.deps.plumber({
        errorHandler: H.deps.notify.onError('Scripts: <%= error.message %>')
      }));
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
        gulp.src(options.templateOptions.src)
          .pipe(H.deps.handlebars(options.transpilerOptions))
          .pipe(H.deps.wrap('Handlebars.template(<%= contents %>)'))
          .pipe(H.deps.declare({
            namespace: options.templateOptions.namespace,
            noRedeclare: true // Avoid duplicate declarations
          }))
          .pipe(H.deps.concat('templates.js'))
          .pipe(gulp.dest(options.dest));
      }
    }

    return stream.pipe(gulp.dest(options.dest))
      .pipe(H.deps.connect.reload());
  };
};
