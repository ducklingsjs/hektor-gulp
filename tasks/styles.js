module.exports = function(gulp, H, options) {

  // Create a standard gulp task
  return gulp.task(options.taskName, function(done) {
    // console.log(options);

    // Dependencies are lazy loaded - load them only when a task that requires them runs
    H.loadDeps(['plumber', 'notify', 'sourcemaps', 'sass', 'autoprefixer', 'connect']);

    // By default, tasks run with maximum concurrency (https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support)
    // That's why a task should _ALWAYS_ do one of the following:
    // * return a stream
    // * return a promise
    // * call the callback function (the only argument in the task function)
    //   callback should get (null|undefined) as only argument if all OK, or an error object
    if (options.loco && options.loco.dest) {
      var loco = require('loco-sass');
      var plugins = [];
      if (options.browsers) {
        var autoprefixer = require('autoprefixer-core');
        plugins.push(autoprefixer({ browsers: options.browsers }));
      }
      loco.render({
        file: options.src,
        loco: {
          dest: {
            styles: options.dest,
            scripts: options.loco.dest
          },
          format: options.loco.format || '%filepath%_%selector%_%sha1:10%',
          plugins: plugins
        }
      }, function(err, res) {
        H.deps.connect.reload();
        done(err);
      });
    } else {
      return gulp.src(options.src)
        .pipe(H.deps.plumber({
          errorHandler: H.deps.notify.onError('Styles: <%= error.message %>')
        }))
        .pipe(H.deps.sourcemaps.init())
        .pipe(H.deps.sass({
          includePaths: options.includePaths
        }))
        .pipe(H.deps.autoprefixer({
            browsers: options.browsers,
            cascade: false
        }))
        .pipe(H.deps.sourcemaps.write())
        .pipe(gulp.dest(options.dest))
        .pipe(H.deps.connect.reload());
    }
  });
};
