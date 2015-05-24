var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var cleanTask = require('./clean');

module.exports = function(gulp, H, options) {
  cleanTask(gulp, H, { paths: options.dest, taskName: 'clean:minify' });

  gulp.task(options.taskName, ['clean:minify'], function () {
    var assets = useref.assets({
      searchPath: options.searchPath
    });

    return gulp.src(options.src)
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(options.dest));
  });
};
