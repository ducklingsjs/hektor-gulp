var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

var source = ['config/*.js', 'tasks/*.js', 'utils/*.js', 'main.js'];

gulp.task('lint', function () {
  return gulp.src(['test/*.js'].concat(source))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function (cb) {
  gulp.src(source)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('tests/index.js', {read: false})
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: './report',
          reporters: ['lcovonly', 'text', 'text-summary', 'html'],
          reportOpts: {
            lcovonly: { dir: './report', file: 'lcov.info' },
            html: { dir: './report/node-html' }
          }
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }))
        .on('error', function(e) { console.error(e.message); })
        .on('end', cb);
    });
});
