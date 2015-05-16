module.exports = function(gulp, H, options) {

  // Create a standard gulp task
  return gulp.task(options.taskName, function() {

    // Dependencies are lazy loaded - load them only when a task that requires them runs
    H.loadDeps(['plumber', 'notify', 'sourcemaps', 'sass', 'autoprefixer', 'connect']);

    // By default, tasks run with maximum concurrency (https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support)
    // That's why a task should _ALWAYS_ do one of the following:
    // * return a stream
    // * return a promise
    // * call the callback function (the only argument in the task function)
    //   callback should get (null|undefined) as only argument if all OK, or an error object
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
  });
};
